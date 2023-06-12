import { FC } from "react"

import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { Text } from "../Themed"

interface Props {
    onSelect: (value: number) => void
    value: number
    disabled?: boolean
}

const CartItemQuantityPicker: FC<Props> = ({ onSelect, value, disabled }) => {
    return <View style={styles.container}>
        <IconButton icon="minus" onPress={() => onSelect(value - 1)} disabled={disabled} />
        <View style={styles.valueContainer}>
            <Text>{value}</Text>
        </View>
        <IconButton icon="plus" onPress={() => onSelect(value + 1)} disabled={disabled} />
    </View>
}

export default CartItemQuantityPicker


const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        width: 100
    },
    valueContainer: {
        marginTop: 16
    }
});