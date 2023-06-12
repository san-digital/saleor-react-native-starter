import { useCallback, useState } from "react";
import { StyleSheet } from 'react-native';
import { Portal, Provider } from "react-native-paper";
import { View } from "../Themed";
import ProductListComponent from "./ProductListComponent";
import ProductFilter from "./filter/ProductFilter";
import ProductFilterBottomSheet from "./filter/ProductFilterBottomSheet";
import { useRouter, useSearchParams } from "expo-router";

const ProductsScreen = () => {
    const {
        search: searchQueryString,
        collection: collectionsQueryString,
        categories: categoriesQueryString,
    } = useSearchParams();
    const router = useRouter()

    const [filterOpen, setFilterOpen] = useState(false);

    const changeCollectionAndCategories = useCallback((collectionValue: string | undefined | null, categories: string[]) => {
        const params = new URLSearchParams();

        if (searchQueryString !== undefined) {
            params.append("search", searchQueryString as string)
        }

        if (collectionValue !== undefined) {
            params.append("collection", collectionValue as string)
        }

        if (categories !== undefined) {
            params.append("categories", categories.join(","))
        } else if (categoriesQueryString !== undefined) {
            params.append("categories", categoriesQueryString as string)
        }

        router.push("/products/results?" + params.toString())
    }, [categoriesQueryString, searchQueryString, collectionsQueryString]);

    return <>
        <Provider>
            <Portal>
                <ProductFilterBottomSheet onClose={() => setFilterOpen(false)} open={filterOpen} onApply={(data) => {
                    setFilterOpen(false)
                    changeCollectionAndCategories(data.collection?.slug, data.categories.map(cat => cat.slug))
                }} />
            </Portal>

            <View style={styles.container}>
                <ProductFilter openFilters={() => setFilterOpen(true)} />
                <ProductListComponent  />
            </View>
        </Provider>
    </>
}

const styles = StyleSheet.create({
    container: {
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

export default ProductsScreen