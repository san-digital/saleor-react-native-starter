import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import ShippingAddressForm from '../components/checkout/ShippingAddressForm';
import { PaddedView, Text } from '../components/Themed';
import { useCartContext } from '../context/useCartContext';



const ShippingAddressScreen = () => {
    const { cart, refreshCart } = useCartContext();
    const router = useRouter()

    if (!cart || cart.lines.length === 0) {
        return <View>
            <Text>Empty Cart</Text>
        </View>
    }

    const complete = async () => {
        await refreshCart()
        router.back()
    }

    return <>
        <PaddedView>
            <Text style={styles.title}>Edit shipping address</Text>
        </PaddedView>

        <ShippingAddressForm onSubmit={complete} onCancel={() => router.back()} />
    </>
}


const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        marginTop: 8
    }
})

export default ShippingAddressScreen