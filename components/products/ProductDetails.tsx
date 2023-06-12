import React, { FC, useState } from "react";
import { ProductFragment, ProductVariantFragment } from "../../saleor/api.generated";
import { PaddedView, Text, View } from './../Themed';
import { StyleSheet } from 'react-native';
import { useCartContext } from "../../context/useCartContext";
import ProductImageCarousel from "./details/ProductImageCarousel";
import parseDescription from "../../utils/parseDescription";
import RenderHtml from 'react-native-render-html';
import { getConfig } from "../../config";
import { useRouter } from "expo-router";
import VariantSelector from "./details/VariantSelector";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";

interface Props {
    product: ProductFragment
}

const ProductDetails: FC<Props> = ({ product }) => {

    const description = parseDescription(product.description)
    const router = useRouter();

    const { addItem, loading } = useCartContext();
    const [selectedVariant, setSelectedVariant] = useState<ProductVariantFragment>(product.defaultVariant as ProductVariantFragment);

    const price = selectedVariant?.pricing?.price?.gross.amount.toLocaleString(getConfig().locale, {
        style: "currency",
        currency: product.defaultVariant?.pricing?.price?.gross.currency
    })


    return <View style={styles.container}>
        <ScrollView>
            <Text style={styles.productTitle}>{product.name}</Text>
            <View>
                <ProductImageCarousel images={product.media?.map(m => ({ url: m.url, alt: m.alt })) || []} />
            </View>
            <VariantSelector product={product} selectedVariant={selectedVariant} onSelect={setSelectedVariant} />

            <PaddedView style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Description</Text>
                <RenderHtml
                    source={{ html: description }}
                />
            </PaddedView>

            <PaddedView>
                <Text style={styles.priceTitle}>Price</Text>

                <Text style={styles.productPrice}>{price}</Text>

                <Button mode="contained" onPress={async () => {
                    await addItem(selectedVariant?.id)
                    router.push("(tabs)/cart")
                }} disabled={loading} >{loading ? "Adding..." : "Add to cart"}</Button>
            </PaddedView>
        </ScrollView>
    </View>
}


const styles = StyleSheet.create({
    container: {
        marginTop: 16
    },
    productTitle: {
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
        padding: 8
    },
    productPrice: {
        textAlign: "left",
        fontSize: 20,
        marginBottom: 16
    },
    productDescription: {
        textAlign: "left",
    },
    descriptionContainer: {

    },
    descriptionTitle: {
        fontWeight: "bold",
        marginBottom: 8
    },
    priceTitle: {
        fontWeight: "bold",
        marginBottom: 8
    }
});

export default ProductDetails