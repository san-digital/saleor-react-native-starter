import { StyleSheet } from "react-native"
import { useCartContext } from "../../context/useCartContext"
import { colors, Divider, PaddedView, Text, View } from "../Themed"
import { getConfig } from "../../config"


const OrderTotal = () => {
    const { cart } = useCartContext()

    const deliveryMethod = cart && cart.shippingPrice.gross.amount && cart.shippingPrice.gross.amount !== 0
        ? cart.shippingPrice.gross.amount
        : undefined

    return <View style={styles.wrapper}>
        <PaddedView style={styles.rowWrapper}>
            <Text>Items:</Text>
            <Text>
                {cart?.subtotalPrice.gross.amount.toLocaleString(getConfig().locale, {
                    style: "currency",
                    currency: cart?.subtotalPrice.gross.currency
                })}
            </Text>
        </PaddedView>
        <PaddedView style={styles.rowWrapper}>
            <Text>Shipping:</Text>
            <Text >
                {deliveryMethod && deliveryMethod.toLocaleString(getConfig().locale, {
                    style: "currency",
                    currency: cart?.shippingPrice.gross.currency
                })}
                {(!deliveryMethod || deliveryMethod === 0) && "-"}
            </Text>
        </PaddedView>
        <Divider />
        <PaddedView style={styles.rowWrapper}>
            <Text style={styles.title}>Order Total:</Text>
            <Text style={styles.title}>
                {cart?.totalPrice.gross.amount.toLocaleString(getConfig().locale, {
                    style: "currency",
                    currency: cart?.totalPrice.gross.currency
                })}
            </Text>
        </PaddedView>
    </View>

}

export default OrderTotal

const styles = StyleSheet.create({
    wrapper: {
        border: "0.5 solid " + colors.dividerGrey,
        borderRadius: 5,
        margin: 8,
        paddingTop: 8,
        paddingBottom: 8,
    },
    icon: {
        marginTop: 5,
        marginRight: 5,
    },
    rowWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 5,
    },
    title: {
        fontWeight: "bold",
        fontSize: 16
    }
})