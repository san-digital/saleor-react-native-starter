import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import BillingAddressForm from '../components/checkout/BillingAddressForm';
import { PaddedView, Text } from '../components/Themed';
import { useCartContext } from '../context/useCartContext';

const BillingAddressScreen = () => {
    const { cart, refreshCart } = useCartContext();
    const router = useRouter()

    if (!cart || cart.lines.length === 0) {
        return <View>
            <Text>Empty Cart</Text>
        </View>
    }

    return <PaddedView>
        <Text style={styles.title}>Edit billing address</Text>
        <BillingAddressForm onSubmit={async () => {
                await refreshCart()
                router.back()
        }} onCancel={() => router.back()} />
    </PaddedView>
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        marginTop: 8,
        marginBottom: 16
    },
});

export default BillingAddressScreen