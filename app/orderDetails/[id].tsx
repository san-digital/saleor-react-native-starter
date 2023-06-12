import { Link, Stack, usePathname, useSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Text } from "../../components/Themed";
import OrderContent from "../../components/orders/OrderContent";
import { useOrderContext } from "../../context/useOrderContext";
import { useEffect, useState } from "react";
import { OrderFragment } from "../../saleor/api.generated";
import { useCartContext } from "../../context/useCartContext";

const NotFoundScreen = () => {
    return (
        <>
            <Stack.Screen options={{ title: 'Oops!' }} />
            <View style={styles.container}>
                <Text style={styles.title}>This order doesn't exist.</Text>

                <Link href="/" style={styles.link}>
                    <Text style={styles.linkText}>Go to home screen!</Text>
                </Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});

const OrderDetailsPage = () => {
    const pathname = usePathname();
    const { orderSuccess } = useSearchParams();
    const { removeCart } = useCartContext();
    const [orderCache, setOrderCache] = useState<OrderFragment | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)
    const { orders } = useOrderContext();

    useEffect(() => {
        setLoading(true)
        if (pathname.indexOf("order") !== -1) {
            const orderId = pathname.split("/")[pathname.split("/").length - 1]
            const order = orders.find(o => o.id === orderId)

            setOrderCache(order)
        }
        if (orderSuccess) {
            removeCart()
        }

        setLoading(false)
    }, [pathname, orders])

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000)
    }, [])

    if (loading) {
        return <Text>Loading</Text>
    }
    if (!orderCache) {
        return <NotFoundScreen />
    }

    return <OrderContent order={orderCache} />

}
export default OrderDetailsPage