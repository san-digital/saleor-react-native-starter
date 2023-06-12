import React, { FC, useCallback, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../Themed';

import { useRouter, useSearchParams } from 'expo-router';
import { useFormik } from 'formik';

interface Props {
    cleanSearch?: boolean
    searchOnLoad?: boolean
}

interface Form {
    search: string
}

const ProductSearch: FC<Props> = ({ cleanSearch, searchOnLoad = true }) => {
    const {
        search: searchQueryString,
        collection: collectionsQueryString,
        categories: categoriesQueryString
    } = useSearchParams();
    const router = useRouter()

    const formik = useFormik<Form>({
        initialValues: {
            search: searchQueryString as string || "",
        },
        initialTouched: {
            search: false
        },
        onSubmit: () => {
            //noop
        },
    });

    const runSearch = useCallback((value: string) => {
        if (cleanSearch) {
            const params = new URLSearchParams();
            if (value !== undefined) {
                params.append("search", value)
            }
            router.push("/products/results?" + params.toString())
        }

        const params = new URLSearchParams();
        if (value !== undefined) {
            params.append("search", value)
        }

        if (collectionsQueryString !== undefined) {
            params.append("collection", collectionsQueryString as string)
        }
        if (categoriesQueryString !== undefined) {
            params.append("categories", categoriesQueryString as string)
        }

        router.push("/products/results?" + params.toString())
    }, [categoriesQueryString, collectionsQueryString]);

    useEffect(() => {
        if (searchOnLoad && (searchQueryString || collectionsQueryString || categoriesQueryString)) {
            runSearch(searchQueryString as string)
        }
        formik.setFieldValue("search", searchQueryString as string)
    }, [searchOnLoad, searchQueryString, collectionsQueryString, categoriesQueryString]);

    const onChange = (value: string) => {
        formik.setFieldValue("search", value)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textInputWrapper}>
                <TextInput
                    placeholderTextColor={colors.textInputGrey}
                    onChangeText={onChange}
                    onSubmitEditing={() => {
                        runSearch(formik.values.search)
                    }}
                    value={formik.values.search}
                    defaultValue={formik.values.search}
                    style={styles.searchBar}
                    placeholder="Search" />
            </View>
        </SafeAreaView>
    );
}

export default ProductSearch


const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    textInputWrapper: {
        display: "flex",
        width: "100%"
    },
    searchBar: {
        height: 36,
        lineHeight: 18,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 1,
        backgroundColor: colors.textInputGreyBackground,
        color: colors.textInputGrey
    },
});

