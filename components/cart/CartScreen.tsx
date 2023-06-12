import { CheckoutLine } from "../../saleor/api.generated";
import { Divider, PaddedView, Text, View } from "../Themed";
import { ScrollView, StyleSheet } from 'react-native';
import { useCartContext } from "../../context/useCartContext";
import CartItem from "./CartItem";
import CartSubtotal from "./CartSubtotal";
import { useRouter } from "expo-router";
import { Button } from "react-native-paper";


const CartScreen = () => {

    const { cart, loading } = useCartContext();
    const navigation = useRouter();


    if (!cart || cart.lines.length === 0) {
        return <View style={styles.emptyCartContainer}>
            <PaddedView>
                <Text style={styles.emptyCartText}>Empty Cart</Text>
            </PaddedView>
            <PaddedView >
                <Button onPress={() => navigation.push("/")} mode="contained" style={styles.checkoutButton}>Go to dashboard</Button>
            </PaddedView>
        </View>
    }

    return <View style={styles.scrollContainer} testID="cart-list-safe">
        <ScrollView style={styles.scroll}  testID="cart-list-scroll">
            <CartSubtotal />
            <PaddedView >
                <Button onPress={() => navigation.push('/checkout')} mode="contained" disabled={loading}>
                    Proceed to checkout
                </Button>
            </PaddedView>
            <Divider />
            {cart.lines.map(line => <CartItem lineItem={line as CheckoutLine} key={line.id} />)}
        </ScrollView >
    </View >

}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyCartContainer: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
    },
    emptyCartText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16
    },
    scroll: {
        width: "100%",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
    checkoutButton: {
        width: "100%",
        button: {
            width: "100%"
        }
    },
});

export default CartScreen