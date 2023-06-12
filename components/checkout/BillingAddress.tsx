import { useRouter } from "expo-router"
import { Pressable, StyleSheet } from "react-native"
import { useCartContext } from "../../context/useCartContext"
import { colors, Text, View } from "../Themed"
import { IconButton } from "react-native-paper"


const BillingAddress = () => {
    const { cart } = useCartContext()
    const router = useRouter();

    const billingDetails = cart && cart.billingAddress
    if (billingDetails) {
        return <Pressable onPress={() => router.push("/billingAddress")}>
            <View style={styles.billAddressWrapper}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.billingAddressTitle}>Billing Address</Text>
                    <IconButton icon="chevron-down" onPress={() => router.push("/billingAddress")} style={styles.icon} />
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.billingAddressValue} numberOfLines={1}>
                        {billingDetails.streetAddress1}{", "}{billingDetails.streetAddress2}{", "}{billingDetails.city}{", "}{billingDetails.postalCode}
                    </Text>
                </View>
            </View>
        </Pressable >
    }

    return <Pressable onPress={() => router.push("/billingAddress")}>
        <View style={styles.billAddressWrapper}>
            <View style={styles.titleWrapper}>
                <Text style={styles.billingAddressTitle}>Billing Address</Text>
                <IconButton icon="chevron-down" onPress={() => router.push("/billingAddress")} style={styles.icon} />
            </View>
            <View style={styles.titleWrapper}>
                <Text style={styles.billingAddressSummary}>Enter billing details</Text>
            </View>
        </View>
    </Pressable >
}

export default BillingAddress

const styles = StyleSheet.create({
    billAddressWrapper: {
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
    billingAddressValue: {
        overflow: "hidden",
        fontStyle: "italic",
        width: 300,
        marginTop: 8,
        marginLeft: 16,
        marginBottom: 16,
    },
    billingAddressTitle: {
        fontWeight: "bold",
        padding: 8,
        marginTop: 8,
        marginLeft: 8,
    },
    billingAddressSummary: {
        overflow: "hidden",
        fontStyle: "italic",
        marginTop: 8,
        marginLeft: 16,
        marginBottom: 16,
    }
})