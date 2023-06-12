import { useSearchParams } from "expo-router";
import { useEffect } from "react";
import ProductsScreen from "../../components/products/ProductsScreen";
import { useProductContext } from "../../context/useProductContext";

const ProductsResults = () => {
    const { search: searchQueryString } = useSearchParams();
    const { search } = useProductContext();

    useEffect(() => {
        if (searchQueryString) {
            search(searchQueryString as string)
        } else {
            search("" as string)
        }
    }, [searchQueryString])

    return <ProductsScreen />
}

export default ProductsResults