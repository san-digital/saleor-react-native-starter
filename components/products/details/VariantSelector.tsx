import { FC } from "react";
import { ProductFragment, ProductVariantFragment } from "../../../saleor/api.generated";
import { PaddedView, View, Text, colors } from "../../Themed";
import { getConfig } from "../../../config";
import { Pressable, StyleSheet } from "react-native";

interface Props {
    product: ProductFragment
    selectedVariant: ProductVariantFragment
    onSelect: (variant: ProductVariantFragment) => void
}

const VariantSelector: FC<Props> = ({ product, selectedVariant, onSelect }) => {
    return <>
        <PaddedView>
            <Text style={styles.title}>Select</Text>
        </PaddedView>
        <PaddedView style={styles.container}>

            {product.variants?.map(variant => <Pressable onPress={() => onSelect(variant)}>
                <View style={selectedVariant.id === variant.id ? styles.selectedVariantBox : styles.variantBox}>
                    <Text style={styles.variantName}>{variant.name}</Text>
                    <Text style={styles.variantPrice}>
                        {variant.pricing?.price?.gross.amount.toLocaleString(getConfig().locale, {
                            style: "currency",
                            currency: variant.pricing?.price?.gross.currency
                        })}
                    </Text>
                </View>
            </Pressable>)}
        </PaddedView>
    </>
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        flexDirection: "row"
    },
    title: {
        fontWeight: "bold",
    },
    selectedVariantBox: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: colors.blue,
        marginRight: 4,
        marginBottom: 4,
        padding: 8
    },
    variantBox: {
        borderStyle: "solid",
        borderWidth: 1,
        marginRight: 4,
        marginBottom: 4,
        padding: 8
    },
    variantName: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 4
    },
    variantPrice: {
        fontSize: 14,
    }
})

export default VariantSelector