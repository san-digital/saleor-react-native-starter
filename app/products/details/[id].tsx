import { usePathname } from "expo-router";
import ProductDetails from "../../../components/products/ProductDetails"
import { useGetProductByIdQuery } from "../../../saleor/api.generated";
import { View } from "react-native"
import { getConfig } from "../../../config";

const ProductDetailsId = () => {
    const pathname = usePathname();
    const productId = pathname.split("/")[pathname.split("/").length - 1]
    const { data, called } = useGetProductByIdQuery({
        variables: {
            id: productId,
            channel: getConfig().channel
        }
    })


    if (called && data?.product) {
        return <View>
            <ProductDetails product={data.product} />
        </View>
    }
    return <></>
}

export default ProductDetailsId