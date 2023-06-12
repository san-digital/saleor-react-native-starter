import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { getConfig } from "../config";
import { CategoryPathFragment, CollectionFragment, ProductFragment, useSearchProductsLazyQuery } from "../saleor/api.generated";
import {
    handleErrors
} from "./checkout";

interface ProductsContextModel {
    products: ProductFragment[] | undefined;
    selectedCategories: CategoryPathFragment[],
    collectionFilter: CollectionFragment | undefined,
    loaded: boolean | undefined;
    loading: boolean | undefined;
    search: (searchString: string) => void;
    setCategoryFilters: (categories: CategoryPathFragment[]) => void
    setCollectionFilter: (collection: CollectionFragment | undefined) => void
}

const ProductsContext = createContext<ProductsContextModel>({
    products: undefined,
    selectedCategories: [],
    loading: undefined,
    loaded: undefined,
    collectionFilter: undefined,
    search: () => { },
    setCategoryFilters: () => { },
    setCollectionFilter: () => { },
});

export const useProductContext = () => useContext(ProductsContext);

export const ProductsProvider: FC<PropsWithChildren> = ({ children }) => {
    const [products, setProducts] = useState<ProductFragment[] | undefined>(undefined);

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [categoryFilters, setCategoryFilters] = useState<CategoryPathFragment[]>([]);
    const [collectionFilter, setCollectionFilter] = useState<CollectionFragment | undefined>(undefined);
    const [searchProducts, searchProductsStatus] = useSearchProductsLazyQuery();

    const loading = searchProductsStatus.loading
    const loaded = searchProductsStatus.called

    useEffect(() => {
        searchProducts({
            variables: {
                channel: getConfig().channel,
                search: searchQuery,
                categories: categoryFilters.map(cat => cat.id),
                collections: collectionFilter ? [collectionFilter.id] : []
            }
        }).then(result => {
            handleErrors(result);
            if (result.data?.products?.edges) {
                setProducts(result.data?.products?.edges.map(edge => edge.node))
            } else {
                setProducts([])
            }

        });
    }, [searchQuery, categoryFilters, collectionFilter]);

    return (
        <ProductsContext.Provider value={{
            search: setSearchQuery,
            setCategoryFilters: (cats) => {
                setCategoryFilters(cats)
            },
            setCollectionFilter: (col) => setCollectionFilter(col),
            collectionFilter,
            products,
            selectedCategories: categoryFilters,
            loading: loading,
            loaded
        }}>
            {children}
        </ProductsContext.Provider>
    );
};
