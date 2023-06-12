import { useEffect } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { getConfig } from "../../config";
import { useCategoryPathsQuery, useGetCollectionsQuery } from "../../saleor/api.generated";
import { Divider, Text } from "../Themed";
import { useRouter } from "expo-router";
import CategoriesScroll from "../Dashboard/CategoriesScroll";
import CollectionBanner from "../Dashboard/collections/CollectionBanner";

const DashboardScreen = () => {
    const router = useRouter();
    const { data, loading, error } = useGetCollectionsQuery()

    const { data: categoriesData, error: catError } = useCategoryPathsQuery({
        variables: {
            channel: getConfig().channel
        }
    })

    useEffect(() => {
        if (error) {
            Alert.alert("Error loading " + error.message)
        }
        if (catError) {
            Alert.alert("Error loading " + catError.message)
        }
    }, [error, catError])


    if (loading) {
        return <View style={styles.scrollContainer} >
            <Text>Loading...</Text>
        </View >
    }

    const collections = data?.collections?.edges
    const bannerCollections = collections?.filter(coll => !!coll.node.backgroundImage)
    const nonBannerCollections = collections?.filter(coll => !coll.node.backgroundImage)

    return <View style={styles.scrollContainer}>
        <ScrollView style={styles.scroll}>
            {bannerCollections && bannerCollections.length > 0
                && <CollectionBanner
                    key={bannerCollections[0].node.id}
                    collection={bannerCollections[0].node}
                    onClick={(coll) => router.push("/products/results?collection=" + coll.slug)}
                    onProductClick={console.log} />}
            <Divider />
            <CategoriesScroll categories={categoriesData?.categories?.edges.map(cat => cat.node) || []} onClick={(slug) => router.push("products/results?categories=" + slug)} />
            <Divider />
            {nonBannerCollections && nonBannerCollections.map(edge => <CollectionBanner key={edge.node.id} collection={edge.node} onClick={console.log} onProductClick={console.log} />)}
            <Divider />

        </ScrollView>
    </View>
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll: {
        width: "100%",
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default DashboardScreen