import { FC } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { PaddedView, Text, View } from "../Themed";
import { CategoryPathFragment } from "../../saleor/api.generated";

interface Props {
    categories: CategoryPathFragment[]
    onClick: (category: string) => void
}

const CategoriesScroll: FC<Props> = ({ categories, onClick }) => {
    return <View style={styles.container}>
        <View style={styles.paddedTitle}>
            <Text style={styles.collectionListTitle}>Browse</Text>
        </View>
        <Carousel
            style={{ width: "100%" }}
            autoPlay={false}
            vertical={false}
            loop={false}
            width={120}
            snapEnabled
            data={categories?.map(cat => {
                const media = cat?.backgroundImage
                const product = cat.products?.edges && cat.products.edges.length > 0 ? cat.products.edges[0] : undefined
                const productMedia = product && product.node.media && product.node.media.length > 0 ? product.node.media[0] : undefined

                return {
                    url: media?.url || productMedia?.url,
                    alt: media?.alt || productMedia?.alt,
                    name: cat.name,
                    slug: cat.slug
                }
            }).filter(item => !!item.url) || []}
            defaultIndex={1}
            renderItem={({ index, item }) => {
                return <Pressable onPress={() => onClick(item.slug)}>
                    <PaddedView style={styles.caroselItem} key={index}>
                    <View style={styles.carouselItemImageContainer}>
                        <Image
                            source={{ uri: item.url }}
                            resizeMode="cover" style={styles.carouselImage}
                        />
                    </View>
                    <Text style={styles.itemText}>{item.name}</Text>
                </PaddedView>
                </Pressable>
            }
            }
        />
    </View>
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 200,
    },
    paddedTitle: {
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 16,
    },
    collectionImageBanner: {
        width: "100%",
    },
    caroselItem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    carouselItemImageContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    carouselImage: {
        width: 100,
        height: 100,
    },
    collectionListTitle: {
        fontSize: 18,
        lineHeight: 34,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    itemText: {
        fontWeight: "bold"
    }

});

export default CategoriesScroll