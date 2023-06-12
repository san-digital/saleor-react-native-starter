import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { PaddedView, Text } from '../components/Themed';
import PersonalDetailsForm from '../components/checkout/PersonalDetailsForm';
import { useCartContext } from '../context/useCartContext';



const PersonalDetailsScreen = () => {
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
            <Text style={styles.title}>Edit personal details</Text>
        </PaddedView>
        <PersonalDetailsForm onSubmit={complete} onCancel={() => router.back()} />
    </>
}


export default PersonalDetailsScreen

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        marginTop: 8
    }
})