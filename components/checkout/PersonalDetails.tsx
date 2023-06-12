import { useRouter } from "expo-router"
import { Pressable, StyleSheet } from "react-native"
import { useCartContext } from "../../context/useCartContext"
import { colors, Text, View } from "../Themed"
import { IconButton } from "react-native-paper"


const PersonalDetails = () => {
    const { cart } = useCartContext()
    const router = useRouter();

    const email = cart && cart.email

    if (email) {
        return <Pressable onPress={() => router.push("/personalDetails")}>
            <View style={styles.personalDetailsWrapper}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.personalDetailsTitle}>Personal Details</Text>
                    <IconButton icon="chevron-down" onPress={() => router.push("/personalDetails")} style={styles.icon} />
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.personalDetailsValue} numberOfLines={1}>
                        {email}
                    </Text>
                </View>
            </View>
        </Pressable >
    }

    return <Pressable onPress={() => router.push("/personalDetails")}>
        <View style={styles.personalDetailsWrapper}>
            <View style={styles.titleWrapper}>
                <Text style={styles.personalDetailsTitle}>Personal Details</Text>
                <IconButton icon="chevron-down" onPress={() => router.push("/personalDetails")} style={styles.icon} />
            </View>
            <View style={styles.titleWrapper}>
                <Text style={styles.personalDetailsSummary}>Enter details</Text>
            </View>
        </View>
    </Pressable >

}

export default PersonalDetails

const styles = StyleSheet.create({
    personalDetailsWrapper: {
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
    personalDetailsValue: {
        overflow: "hidden",
        fontStyle: "italic",
        width: 300,
        marginTop: 8,
        marginLeft: 16,
        marginBottom: 16,
    },
    personalDetailsTitle: {
        fontWeight: "bold",
        padding: 8,
        marginTop: 8,
        marginLeft: 8,
    },
    personalDetailsSummary: {
        overflow: "hidden",
        fontStyle: "italic",
        marginTop: 8,
        marginLeft: 16,
        marginBottom: 16,
    }
})