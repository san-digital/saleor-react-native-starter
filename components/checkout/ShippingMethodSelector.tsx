import { useRouter } from "expo-router";
import { FC } from "react";
import { Pressable, StyleSheet } from 'react-native';
import { getConfig } from "../../config";
import { useCartContext } from "../../context/useCartContext";
import { colors, Text, View } from "../Themed";
import { IconButton } from "react-native-paper";

const ShippingMethodSelector: FC = () => {
    const { cart } = useCartContext()
    const router = useRouter()

    const shippingMethods = cart && cart.shippingMethods
    const deliveryMethod = cart && cart.shippingPrice.gross.amount || 0

    if (shippingMethods && shippingMethods?.length > 0) {
        return <Pressable onPress={() => router.push("/shippingMethods")}>
            <View style={styles.shippingMethodWrapper}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.shippingMethodTitle}>Shipping method</Text>
                    <IconButton icon="chevron-down" onPress={() => router.push("/shippingMethods")} style={styles.icon} />
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.shippingMethodValue} numberOfLines={1}>
                        {deliveryMethod.toLocaleString(getConfig().locale, {
                            style: "currency",
                            currency: cart.shippingPrice.gross.currency
                         })}
                    </Text>
                </View>
            </View>
        </Pressable >
    }

    return <Pressable onPress={() => router.push("/shippingMethods")}>
        <View style={styles.shippingMethodWrapper}>
            <View style={styles.titleWrapper}>
                <Text style={styles.shippingMethodTitle}>Shipping Method</Text>
                <IconButton icon="chevron-down" onPress={() => router.push("/shippingMethods")} style={styles.icon} />
            </View>
            <View style={styles.titleWrapper}>
                <Text style={styles.shippingMethodSummary}>Input shipping address first</Text>
            </View>
        </View>
    </Pressable >

}

export default ShippingMethodSelector

const styles = StyleSheet.create({
    shippingMethodWrapper: {
        border: "0.5 solid " + colors.dividerGrey,
        borderRadius: 5,
        margin: 8
    },
    icon: {
        marginTop: 5,
        marginRight: 5,
    },
    titleWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 5,
    },
    shippingMethodValue: {
        overflow: "hidden",
        fontStyle: "italic",
        width: 300,
        marginTop: 8,
        marginLeft: 16,
        marginBottom: 16,
    },
    shippingMethodTitle: {
        fontWeight: "bold",
        padding: 8,
        marginTop: 8,
        marginLeft: 8,
    },
    shippingMethodSummary: {
        overflow: "hidden",
        fontStyle: "italic",
        marginTop: 8,
        marginLeft: 16,
        marginBottom: 16,
    }
})