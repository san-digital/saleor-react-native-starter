import React from "react";
import type {
    StyleProp,
    ViewStyle,
    ImageURISource,
} from "react-native";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    Image,
    Text,
} from "react-native";

interface Props {
    style?: StyleProp<ViewStyle>
    index?: number
    showIndex?: boolean
    url: string
    alt: string
}

const ProductImage: React.FC<Props> = ({
    style,
    index: _index,
    showIndex = true,
    url,
    alt
}) => {
    const index = (_index || 0) + 1;
    const source = React.useRef<ImageURISource>({
        uri: url,
    }).current;

    return (
        <View style={[styles.container, style]}>
            <ActivityIndicator size="small" />
            <Image key={index} style={styles.image} source={source} alt={alt} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        overflow: "hidden",
    },
    image: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

export default ProductImage