import { useRouter, useSearchParams } from "expo-router";
import { FC } from "react";
import { Image, Pressable, StyleSheet } from 'react-native';
import { getConfig } from "../../config";
import { ProductFragment } from "../../saleor/api.generated";
import { Divider, Text, View } from './../Themed';

interface Props {
    product: ProductFragment

}

const ProductImage: FC<{ product: ProductFragment }> = ({ product }) => {
    if (product.media && product.media.length > 0) {
        return <Image
            style={styles.tinyLogo}
            source={{
                uri: product?.media[0].url
            }}
        />
    }
    return <>No Image</>
}

const ProductListItem: FC<Props> = ({ product }) => {
    const formatter = new Intl.NumberFormat(getConfig().locale, {
        style: 'currency',
        currency: product.defaultVariant?.pricing?.price?.gross.currency,
    });
    const router = useRouter();

    //in order to fix flicking filter bug
    const searchParams = useSearchParams();
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([key, value]) => {
        params.append(key, value as string)
    });


    return <>
        <Pressable onPress={() => router.push("products/details/" + product.id + "?" + params.toString())}>
            <View style={styles.productItem}>
                <View style={styles.imageWrapper} testID="product-image-wrapper">
                    <ProductImage product={product} />
                    <View style={styles.productDetailWrapper}>
                        <Text style={styles.productTitle} numberOfLines={2} >
                            {product.name}
                        </Text>
                        <Text style={styles.productPrice} >
                            {formatter.format(product.defaultVariant?.pricing?.price?.gross.amount || 0)}
                        </Text>
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
        marginBottom: 16,
        width: 200
    },
    productPrice: {
        textAlign: "left",
        fontSize: 20
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

export default ProductListItem