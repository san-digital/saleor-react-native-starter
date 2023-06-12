import { FC } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { OrderFragment } from "../../saleor/api.generated";
import { Divider, PaddedView, Text, View } from "../Themed";
import OrderLineItemComponent from "./OrderLineItemComponent";
import OrderSubtotal from "./OrderSubtotal";


interface Props {
    order: OrderFragment
}

const OrderContent: FC<Props> = ({ order }) => {

    if (order) {
        return<ScrollView style={styles.scroll} testID="cart-list-scroll">
                <PaddedView>
                    <Text style={styles.orderNumberText}>Order #{order.number}</Text>
                    <OrderSubtotal order={order} />

                </PaddedView>

                <Divider />
                {order.lines.map(line => <OrderLineItemComponent lineItem={line} key={line.id} />)}
            </ScrollView >
    }

    return <View>
        <Text>You have no orders</Text>
    </View>
}

export default OrderContent


const styles = StyleSheet.create({
    scroll: {
        width: "100%",
        marginTop: 12
    },
    checkoutButton: {
        width: "100%",
        button: {
            width: "100%"
        }
    },
    orderNumberText: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 16,
        marginBottom: 8
    }
});