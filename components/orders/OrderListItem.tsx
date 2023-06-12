import { FC } from "react"
import { OrderFragment } from "../../saleor/api.generated"
import { PaddedView, Text, View, colors } from "../Themed"
import { StyleSheet, Pressable } from "react-native"
import { IconButton } from "react-native-paper"
import { useRouter } from "expo-router"

interface Props {
    order: OrderFragment
}

const OrderListItem: FC<Props> = ({ order }) => {

    const router = useRouter();
    const onPress = () => router.push("/orderDetails/" + order.id)

    return <Pressable onPress={onPress}>
        <PaddedView style={styles.wrapper}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Order: #{order.number}</Text>
                <IconButton icon="chevron-right" onPress={onPress} style={styles.icon} />
            </View>
        </PaddedView>
    </Pressable>
}

export default OrderListItem

const styles = StyleSheet.create({
    wrapper: {
        border: "0.5 solid " + colors.dividerGrey,
        borderRadius: 5,
        margin: 8
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        padding: 8,
        marginTop: 8,
        marginLeft: 8,
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
})