import React, { FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useProductContext } from '../../../context/useProductContext';

import { useSearchParams } from 'expo-router';
import { getConfig } from '../../../config';
import { CategoryPathFragment, CollectionFragment, useCategoryPathsQuery, useGetCollectionsQuery } from '../../../saleor/api.generated';
import { Divider, Text, View } from '../../Themed';
import { Button } from 'react-native-paper';

interface Props {
    openFilters: () => void
}

const ProductFilter: FC<Props> = ({ openFilters }) => {

    const { collection: collectionsQueryString, categories: categoriesQueryString } = useSearchParams();
    const { data: collectionsData, called: collectionsCalled } = useGetCollectionsQuery()
    const { data: categoriesData } = useCategoryPathsQuery({
        variables: {
            channel: getConfig().channel
        }
    })

    const { setCategoryFilters, selectedCategories, collectionFilter, setCollectionFilter } = useProductContext();

    useEffect(() => {
        if (collectionsQueryString && collectionsCalled) {
            const foundCollection: CollectionFragment | undefined = collectionsData?.collections?.edges.map(edge => edge.node)
                .find(collection => collection.slug === collectionsQueryString);

            setCollectionFilter(foundCollection)
        }
        if (!collectionsQueryString) {
            setCollectionFilter(undefined)
        }
    }, [collectionsQueryString, collectionsData])

    useEffect(() => {
        if (categoriesQueryString && categoriesData) {
            const foundCategories: CategoryPathFragment[] = categoriesData?.categories?.edges.map(edge => edge.node)
                .filter(cat => {
                    if (typeof categoriesQueryString === "string") {
                        const categories = categoriesQueryString.split(",")
                        return categories.indexOf(cat.slug) !== -1
                    }

                    if (Array.isArray(categoriesQueryString)) {
                        return categoriesQueryString.indexOf(cat.slug) !== -1
                    }

                    return false;
                }) || [];

            setCategoryFilters(foundCategories)
        }
        if (!categoriesQueryString) {
            setCategoryFilters([])
        }
    }, [categoriesQueryString, categoriesData])

    const numberOfFilters = selectedCategories.length + (collectionFilter ? 1 : 0);

    return (
        <View style={styles.wrapper}>

            <Divider />
            <View style={styles.filterWrapper}>
                {numberOfFilters !== 0 && <Text style={styles.filterLabel}>{numberOfFilters} filters applied</Text>}
                {numberOfFilters === 0 && <Text style={styles.filterLabel}>No Filters</Text>}
                <Button style={styles.filterButton} onPress={() => openFilters()} icon="chevron-down"
                    contentStyle={{ flexDirection: 'row-reverse' }}> Filters </Button>
            </View>
            <Divider />
        </View>
    );
}

const styles = StyleSheet.create({
    filterLabel: {
        paddingTop: 12,
    },
    filterButton: {
        paddingTop: 0,
    },
    wrapper: {
        width: "100%",
        paddingLeft: 16,
        paddingRight: 16,
    },
    filterWrapper: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingBottom: 4,
    },
});

export default ProductFilter
