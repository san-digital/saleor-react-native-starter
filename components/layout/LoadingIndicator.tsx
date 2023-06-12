import { ProgressBar } from "react-native-paper"
import { useCartContext } from "../../context/useCartContext"
import { useCategoryPathsQuery, useGetCollectionsQuery } from "../../saleor/api.generated";
import { getConfig } from "../../config";
import { View } from "../Themed";
import { useProductContext } from "../../context/useProductContext";
import { FC } from "react";
import { useOrderContext } from "../../context/useOrderContext";

interface Props {
    style?: any
}

const LoadingIndicator: FC<Props> = ({ style }) => {
    const { loading: cartLoading } = useCartContext();
    const { loading: collectionsLoading } = useGetCollectionsQuery()

    const { loading: categoriesLoading } = useCategoryPathsQuery({
        variables: {
            channel: getConfig().channel
        }
    })
    const { loading: productsLoading } = useProductContext()
    const { loading: orderLoading } = useOrderContext();

    const loading = cartLoading || collectionsLoading || categoriesLoading || productsLoading || orderLoading;

    if (!loading) {
        return <></>
    }

    return <View style={{ backgroundColor: "white" }}>
        <ProgressBar indeterminate style={{ ...(style || {}), }} />
    </View>
}

export default LoadingIndicator