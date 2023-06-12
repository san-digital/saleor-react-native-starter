import { FC, useEffect, useState } from "react"
import { StyleSheet, useWindowDimensions } from "react-native"
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel'
import Carousel from "react-native-reanimated-carousel"
import { View, colors } from "../../Themed"
import ProductImage from "./ProductImage"


interface Props {
    forceIndex?: number,
    images: { url: string, alt: string }[]
}

const ProductImageCarousel: FC<Props> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const { width: windowWidth } = useWindowDimensions();

    useEffect(() => {
        setCurrentIndex(0)
    }, [images])


    return <View style={styles.container}>
        <View style={styles.carouselContainer}>
            <Carousel
                style={{ width: "100%" }}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
                loop={false}
                width={windowWidth}

                snapEnabled
                onSnapToItem={(index) => setCurrentIndex(index)}
                data={images}
                defaultIndex={0}
                renderItem={({ index, item }) => <ProductImage index={index}
                    url={item.url}
                    alt={item.alt}
                />

                }
            />
        </View>

        <View style={styles.dotsContainer}>
            <View>
                <AnimatedDotsCarousel
                    length={images.length}
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
        height: 300,
    },
    carouselContainer: {
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
    },
    dotsContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
});

export default ProductImageCarousel