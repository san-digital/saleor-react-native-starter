import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';

interface Props {
    label: string
    status: "checked" | "unchecked"
    onPress: () => void
}

const CheckBoxWithLabel: React.FC<Props> = ({ label, status, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                <Text >{label}</Text>
                <Checkbox status={status} />
            </View>
        </TouchableOpacity>
    );
}

export default CheckBoxWithLabel;