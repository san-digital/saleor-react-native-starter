import { FC } from "react";
import { CheckoutLine } from "../../saleor/api.generated";
import { Divider, Text, View } from './../Themed';
import { Image, Pressable, StyleSheet } from 'react-native';
import { getConfig } from "../../config";
import { useRouter } from "expo-router";
import CartItemQuantityPicker from "./CartItemQuantityPicker";
import { useCartContext } from "../../context/useCartContext";

interface Props {
    lineItem: CheckoutLine

}

const CartImage: FC<{ line: CheckoutLine }> = ({ line }) => {
    if (line.variant.media && line.variant.media.length > 0) {
        return <Image
            style={styles.tinyLogo}
            source={{
                uri: line.variant.media[0].url
            }}
        />
    }
    return <>No Image</>
}

const CartItem: FC<Props> = ({ lineItem }) => {
    const router = useRouter();
    const { updateItemQuantity, loading } = useCartContext();
    const formatter = new Intl.NumberFormat(getConfig().locale, {
        style: 'currency',
        currency: lineItem.totalPrice?.gross.currency,
    });


    return <>
        <Pressable onPress={() => router.push("products/details/" + lineItem.variant.product.id)}>
            <View style={styles.productItem}>
                <View style={styles.imageWrapper} testID="product-image-wrapper">
                    <CartImage line={lineItem} />
                    <View style={styles.productDetailWrapper}>
                        <Text style={styles.productTitle} >
                            {lineItem.variant.product.name}
                        </Text>
                        <Text style={styles.productVariant} >
                            {lineItem.variant.name}
                        </Text>
                        <Text style={styles.productPrice} >
                            {formatter.format(lineItem.undiscountedUnitPrice.amount || 0)}
                        </Text>
                        <View>
                            <Text >
                                Quantity:
                            </Text>
                            <CartItemQuantityPicker value={lineItem.quantity} onSelect={(value) => updateItemQuantity(lineItem.id, value)} disabled={loading} />
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
        <Divider />
    </>
}


const styles = StyleSheet.create({
    productItem: {
        width: "100%",
        maxWidth: 600,
        marginTop: 16,
        marginBottom: 16
    },
    tinyLogo: {
        width: 140,
        height: 140,
    },
    productTitle: {
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8
    },
    productVariant: {
        textAlign: "left",
        fontSize: 16,
        marginBottom: 16
    },
    productPrice: {
        textAlign: "left",
        fontSize: 20,

        marginBottom: 16
    },
    productDescription: {
        textAlign: "left",
    },
    imageWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    productDetailWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
    }
});

export default CartItem