import { FC, useState } from "react";
import { CollectionFragment } from "../../../saleor/api.generated";
import { ImageBackground, Pressable, StyleSheet, Image, useWindowDimensions } from "react-native";
import { View, Text, PaddedView, colors } from "../../Themed";
import parseDescription from "../../../utils/parseDescription";
import { Button } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import { useRouter } from "expo-router";
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';

interface Props {
    collection: CollectionFragment
    onClick: (collection: CollectionFragment) => void
    onProductClick: (collectionId: string, productId: string, variantId: string) => void
}

const CollectionImageBanner: FC<Props> = ({ collection, onClick, onProductClick }) => {
    const image = { uri: collection.backgroundImage?.url }
    const description = parseDescription(collection?.description)


    return <View style={styles.collectionImageBanner}>
        <Pressable onPress={() => onClick(collection)}>
            <ImageBackground source={image} resizeMode="cover" style={styles.carouselBannerImage}>
                <View style={styles.collectionImageInnerWrapper}>
                    <Text style={styles.collectionImageBannerTitle}>
                        {collection.name}
                    </Text>
                    <Text style={styles.collectionImageBannerDescription}>
                        {description}
                    </Text>
                </View>
                <Button mode="text" onPress={() => onClick(collection)} style={styles.collectionButton} textColor="white">
                    View Products
                </Button>

            </ImageBackground>
        </Pressable>
    </View >
}

const CollectionBanner: FC<Props> = ({ collection, onClick, onProductClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const { width } = useWindowDimensions();
    const router = useRouter();

    if (collection.backgroundImage) {
        return <CollectionImageBanner collection={collection} onClick={onClick} onProductClick={onProductClick} />
    }

    return <View style={styles.container}>
        <PaddedView>
            <Text style={styles.collectionListTitle}>{collection.name}</Text>
        </PaddedView>
        <Carousel
            style={{ width: "100%" }}
            autoPlay={false}
            vertical={false}
            loop={false}
            width={width / 2}
            height={210}
            snapEnabled
            onSnapToItem={(index) => setCurrentIndex(index)}
            data={collection.products?.edges.map(edge => {
                const media = edge.node.defaultVariant?.media && edge.node.defaultVariant?.media?.length > 0 ? edge.node.defaultVariant?.media[0] : undefined
                return {
                    url: media?.url,
                    alt: media?.alt,
                    name: edge.node.name,
                    id: edge.node.id,
                }
            }) || []}
            defaultIndex={1}
            renderItem={({ index, item }) => <Pressable onPress={() => router.push("products/details/" + item.id)}>
                <PaddedView style={styles.caroselItem} key={index}>
                    <View style={styles.carouselItemImageContainer}>
                        <Image source={{ uri: item.url }} resizeMode="cover" style={styles.carouselImage} />
                    </View>
                    <Text>{item.name}</Text>
                </PaddedView>
            </Pressable>
            }
        />

        <View style={styles.dotsContainer}>
            <View>
                <AnimatedDotsCarousel
                    length={collection.products?.edges.length || 0}
                    currentIndex={currentIndex}
                    maxIndicators={4}
                    interpolateOpacityAndColor={true}
                    activeIndicatorConfig={{
                        color: colors.blue,
                        margin: 3,
                        opacity: 1,
                        size: 6,
                    }}
                    inactiveIndicatorConfig={{
                        color: 'black',
                        margin: 3,
                        opacity: 0.2,
                        size: 6,
                    }}
                    decreasingDots={[
                        {
                            config: { color: 'black', margin: 3, opacity: 0.1, size: 6 },
                            quantity: 1,
                        },
                        {
                            config: { color: 'black', margin: 3, opacity: 0.1, size: 6 },
                            quantity: 1,
                        },
                    ]}
                />
            </View>
        </View>
    </View>
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 280,
    },
    collectionImageBanner: {
        width: "100%",
    },
    caroselItem: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginLeft: 96,
        marginRight: 96,
    },
    carouselItemImageContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    carouselBannerImage: {
        width: "100%",
        height: 200,
    },
    carouselImage: {
        width: 150,
        height: 150,
    },
    collectionImageInnerWrapper: {
        position: "absolute",
        left: 10,
        top: 10,
        padding: 8,
        backgroundColor: '#000000c0',
    },
    collectionButton: {
        position: "absolute",
        bottom: 0,
        right: 10,
        padding: 8,
    },
    collectionListTitle: {
        fontSize: 18,
        lineHeight: 34,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    collectionImageBannerTitle: {
        color: 'white',
        fontSize: 14,
        lineHeight: 34,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    collectionImageBannerDescription: {
        color: 'white',
        fontSize: 12,
        textAlign: 'left',
    },
    dotsContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
});

export default CollectionBanner