import { useRouter } from "expo-router"
import { Pressable, StyleSheet } from "react-native"
import { useCartContext } from "../../context/useCartContext"
import { colors, Text, View } from "../Themed"
import { IconButton } from "react-native-paper"


const ShippingAddress = () => {
    const { cart } = useCartContext()
    const router = useRouter();

    const shippingDetails = cart && cart.shippingAddress

    if (shippingDetails) {
        return <Pressable onPress={() => router.push("/shippingAddress")}>
            <View style={styles.shippingAddressWrapper}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.shippingAddressTitle}>Shipping Address</Text>
                    <IconButton icon="chevron-down" onPress={() => router.push("/shippingAddress")} style={styles.icon} />
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.shippingAddressValue} numberOfLines={1}>
                        {shippingDetails.streetAddress1}{", "}{shippingDetails.streetAddress2}{", "}{shippingDetails.city}{", "}{shippingDetails.postalCode}
                    </Text>
                </View>
            </View>
        </Pressable >
    }


    return <Pressable onPress={() => router.push("/shippingAddress")}>
        <View style={styles.shippingAddressWrapper}>
            <View style={styles.titleWrapper}>
                <Text style={styles.shippingAddressTitle}>Shipping Address</Text>
                <IconButton icon="chevron-down" onPress={() => router.push("/shippingAddress")} style={styles.icon} />
            </View>
            <View style={styles.titleWrapper}>
                <Text style={styles.shippingAddressSummary}>Enter details</Text>
            </View>
        </View>
    </Pressable >

}

export default ShippingAddress

const styles = StyleSheet.create({
    shippingAddressWrapper: {
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
    shippingAddressValue: {
        overflow: "hidden",
        fontStyle: "italic",
        width: 300,
        marginTop: 8,
        marginLeft: 16,
        marginBottom: 16,
    },
    shippingAddressTitle: {
        fontWeight: "bold",
        padding: 8,
        marginTop: 8,
        marginLeft: 8,
    },
    shippingAddressSummary: {
        overflow: "hidden",
        fontStyle: "italic",
        marginTop: 8,
        marginLeft: 16,
        marginBottom: 16,
    }
})