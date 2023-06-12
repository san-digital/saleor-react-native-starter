import { StyleSheet } from "react-native"
import { getConfig } from "../../config";
import { useCartContext } from "../../context/useCartContext"
import { PaddedView, Text } from "../Themed"

const CartSubtotal = () => {
    const { cart } = useCartContext();

    if (!cart) {
        return <></>
    }

    return <PaddedView style={styles.subtotalContainer}>
        <Text  >
            <Text style={styles.title}>Subtotal: </Text>
            <Text style={styles.subtotalPrice}>
                {(cart.subtotalPrice.gross.amount).toLocaleString(getConfig().locale, {
                    style: "currency",
                    currency: cart.subtotalPrice.gross.currency
                })}
            </Text>
        </Text>

        <Text>
            includes{" "}
            {cart.totalPrice.tax.amount.toLocaleString(getConfig().locale, {
                style: "currency",
                currency: cart.subtotalPrice.tax.currency,
            })}{" "}
            VAT
        </Text>
    </PaddedView>
}

const styles = StyleSheet.create({
    subtotalContainer: {
        width: "100%",
        maxWidth: 600,
        marginTop: 8,
        marginBottom: 8
    },
    title: {
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8
    },
    subtotalPrice: {
        textAlign: "left",
        marginLeft: 8,
        fontSize: 16,
    },
})

export default CartSubtotal