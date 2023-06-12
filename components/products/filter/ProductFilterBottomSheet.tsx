import { useFormik } from "formik";
import { FC, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Chip, Modal } from "react-native-paper";
import * as yup from "yup";
import CheckBoxWithLabel from "../../../utils/CheckboxWithLabel";
import { getConfig } from "../../../config";
import { useProductContext } from "../../../context/useProductContext";
import { CategoryPathFragment, CollectionFragment, useCategoryPathsQuery, useGetCollectionsQuery } from "../../../saleor/api.generated";
import { Text, View } from "../../Themed";

interface Props {
    open: boolean
    onClose: () => void
    onApply: (data: {
        collection: CollectionFragment | undefined,
        categories: CategoryPathFragment[]
    }) => void
}

interface Form {
    collection: string,
    categories: string[]
}

const validationSchema = yup.object().shape({
    collection: yup.string().required("Required"),
    categories: yup.array().required("Required"),
});

const CollectionForm: FC<{ value: string | undefined, collections: CollectionFragment[], onChange: (value: string | undefined) => void }> = ({ collections, value: collectionFilter, onChange }) => {
    const selectedCollection = collections?.filter(edge => edge.slug === collectionFilter);
    const unselectedCollections = collections?.filter(edge => edge.slug !== collectionFilter);


    return <View style={styles.collectionsContainer}>
        {selectedCollection && selectedCollection.length > 0 &&
            <Chip
                key={selectedCollection[0].id}
                selected={true}
                mode={"flat"}
                onClose={() => onChange(undefined)}
                style={styles.collectionsChip}
                onPress={() => onChange(undefined)}
            >
                {selectedCollection[0].name}
            </Chip>}
        {unselectedCollections && unselectedCollections.map(edge => (
            <Chip
                key={edge.id}
                selected={false}
                style={styles.collectionsChip}
                mode={"outlined"}
                onPress={() => onChange(edge.slug)}>
                {edge.name}
            </Chip>)
        )}
    </View>
}

const ProductFilterBottomSheet: FC<Props> = ({ open, onClose, onApply }) => {

    const { data: collectionsData } = useGetCollectionsQuery();
    const { data: categoriesData } = useCategoryPathsQuery({
        variables: {
            channel: getConfig().channel
        }
    });

    const { collectionFilter, selectedCategories } = useProductContext();
    const containerStyle = { backgroundColor: 'white', padding: 20, maxHeight: 500 };

    const formik = useFormik<Form>({
        initialValues: {
            collection: "",
            categories: [],
        },
        validationSchema: validationSchema,
        onSubmit: () => { }
    });


    const submitForm = () => {
        const formData = formik.values
        onApply({
            categories: categoriesData?.categories?.edges
                .filter(cat => formData.categories.findIndex(formCat => formCat === cat.node.slug) !== -1)
                .map(edge => edge.node) || [],
            collection: collectionsData?.collections?.edges.find(collection => collection.node.slug === formData.collection)?.node
        })
    }

    useEffect(() => {
        if (collectionFilter && collectionsData) {
            formik.setFieldValue("collection", collectionFilter.slug)
        }
    }, [collectionFilter, collectionsData])

    useEffect(() => {
        if (selectedCategories && categoriesData) {
            formik.setFieldValue("categories", selectedCategories.map(cat => cat.slug))
        }
    }, [selectedCategories, categoriesData])


    return (<Modal visible={open} onDismiss={onClose} contentContainerStyle={containerStyle}>
        <ScrollView>
            <View style={styles.filterTypeContainer}>
                <Text style={styles.filterTypeTitle}>Collections</Text>
                {collectionsData?.collections?.edges.map(edge => edge.node) && <CollectionForm
                    onChange={(value) => formik.setFieldValue("collection", value)}
                    value={formik.values.collection}
                    collections={collectionsData?.collections?.edges.map(edge => edge.node)}
                />}
            </View>

            <View style={styles.filterTypeContainer}>
                <Text style={styles.filterTypeTitle}>Categories</Text>
                {categoriesData?.categories?.edges && categoriesData.categories?.edges
                    .map(cat =>
                        <CheckBoxWithLabel
                            status={formik.values.categories.find(c => c === cat.node.slug) ? "checked" : "unchecked"}
                            key={cat.node.id}
                            onPress={() => {
                                if (formik.values.categories.find(c => c === cat.node.slug)) {
                                    const removed = formik.values.categories.filter(c => c !== cat.node.slug);
                                    formik.setFieldValue("categories", [...removed])
                                } else {
                                    formik.setFieldValue("categories", [...formik.values.categories, cat.node.slug])
                                }
                            }}
                            label={cat.node.name} />
                    )}
            </View>
        </ScrollView>
        <View style={styles.buttonGroup}>
            <Button mode="contained" onPress={submitForm}>Apply</Button>
            <Button mode="text" onPress={() => formik.resetForm()}>Reset</Button>
        </View>
    </Modal >
    );
};

const styles = StyleSheet.create({
    filterTypeTitle: {
        fontWeight: "bold",
        marginBottom: 8
    },
    collectionsContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    collectionsChip: {
        marginRight: 4,
        marginBottom: 8
    },
    filterTypeContainer: {
        marginBottom: 16
    },
    buttonGroup: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16

    }
})

export default ProductFilterBottomSheet;