import { ApolloError } from "@apollo/client";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { OrderFragment, useGetOrderByIdLazyQuery } from "../saleor/api.generated";
import {
    handleErrors
} from "./checkout";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface OrdersContextModel {
    recentOrderId: string | undefined;
    setRecentOrderId: (id: string) => void
    recentOrder: OrderFragment | undefined;
    orders: OrderFragment[]
    loaded: boolean | undefined;
    loading: boolean | undefined;
    error: ApolloError | undefined;
}

const OrdersContext = createContext<OrdersContextModel>({
    recentOrder: undefined,
    recentOrderId: undefined,
    orders: [],
    loading: undefined,
    loaded: undefined,
    error: undefined,
    setRecentOrderId: () => { },
});

export const useOrderContext = () => useContext(OrdersContext);

export const OrderProvider: FC<PropsWithChildren> = ({ children }) => {

    const [savedOrders, setSavedOrders] = useState<OrderFragment[]>([])
    const [recentOrderId, setRecentOrderId] = useState<string | undefined>(undefined);
    const [recentOrder, setRecentOrder] = useState<OrderFragment | undefined>(undefined);

    const [getOrderById, getOrderByIdStatus] = useGetOrderByIdLazyQuery()
    const loading = getOrderByIdStatus.loading
    const loaded = getOrderByIdStatus.called
    const error = getOrderByIdStatus.error

    const loadOrder = async () => {
        const res = await getOrderById({
            variables: {
                id: recentOrderId as string
            }
        })

        handleErrors(res)
        setRecentOrder(res.data?.order as OrderFragment)
        setSavedOrders([...savedOrders, res.data?.order as OrderFragment])
    }

    useEffect(() => {
        if (recentOrderId) {
            loadOrder()
        }
    }, [recentOrderId]);

    useEffect(() => {
        handleLoad()
    }, [])

    const handleLoad = async () => {
        const ordersListString = await AsyncStorage.getItem("@SaleorApp:orders")
        if (ordersListString) {
            const orderIds = ordersListString.split(",")
            const foundOrders = await Promise.all(orderIds.map(o => {
                return getOrderById({
                    variables: {
                        id: o
                    }
                }).then(res => res.data?.order)
            }))
            setSavedOrders(foundOrders.filter(o => !!o) as OrderFragment[])
        }
    }

    const handleRecentOrder = (orderId: string) => {
        AsyncStorage.setItem("@SaleorApp:orders", [orderId, ...savedOrders.map(s => s.id)].join(","))
        setRecentOrderId(orderId)
    }

    return (
        <OrdersContext.Provider value={{
            recentOrder: recentOrder,
            recentOrderId: recentOrderId,
            setRecentOrderId: handleRecentOrder,
            orders: savedOrders,
            error,
            loading: loading,
            loaded
        }}>
            {children}
        </OrdersContext.Provider>
    );
}
