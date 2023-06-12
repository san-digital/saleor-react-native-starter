import { StyleSheet } from "react-native"
import { getConfig } from "../../config";
import { Text, View } from "../Themed"
import { OrderFragment } from "../../saleor/api.generated";
import { FC } from "react";

interface Props {
    order: OrderFragment
}
const OrderSubtotal: FC<Props> = ({ order }) => {

    return <View style={styles.subtotalContainer}>
        <Text style={styles.row}>
            <Text style={styles.subtotalTitle}>Subtotal: </Text>
            <Text style={styles.subtotalPrice}>
                {(order.subtotal.gross.amount).toLocaleString(getConfig().locale, {
                    style: "currency",
                    currency: order.subtotal.gross.currency
                })}
                {"  "}includes{" "}
                {order.total.tax.amount.toLocaleString(getConfig().locale, {
                    style: "currency",
                    currency: order.subtotal.tax.currency,
                })}{" "}
                VAT
            </Text>
        </Text>
        <Text style={styles.row}>
            <Text style={styles.subtotalTitle}>Shipping: </Text>
            <Text style={styles.subtotalPrice}>
                {(order.shippingPrice.gross.amount).toLocaleString(getConfig().locale, {
                    style: "currency",
                    currency: order.shippingPrice.gross.currency
                })}

            </Text>
        </Text>

    </View>
}

const styles = StyleSheet.create({
    subtotalContainer: {
        width: "100%",
        maxWidth: 600,
        marginTop: 8,
        marginBottom: 8
    },
    subtotalTitle: {
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 8
    },
    subtotalPrice: {
        textAlign: "left",
        marginLeft: 8,
        fontSize: 14,
    },
    row: {
        marginBottom: 8,
    }
})

export default OrderSubtotal