import { StyleSheet } from "react-native";
import { useOrderContext } from "../../context/useOrderContext";
import { PaddedView, Text } from "../Themed";
import OrderListItem from "./OrderListItem";

const OrdersList = () => {
    const { orders } = useOrderContext();

    if (!orders || orders.length === 0) {
        <PaddedView>
            <Text>No Orders</Text>
        </PaddedView>
    }
    return (
        <>
            {orders.map(order => <OrderListItem order={order} key={order.id} />)}
        </>
    )

}

const styles = StyleSheet.create({
});

export default OrdersList