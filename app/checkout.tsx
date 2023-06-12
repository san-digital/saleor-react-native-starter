import { PaymentSheetError, StripeProvider, initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Divider, PaddedView, Text, View, colors } from '../components/Themed';
import BillingAddress from '../components/checkout/BillingAddress';
import PersonalDetails from '../components/checkout/PersonalDetails';
import ShippingAddress from '../components/checkout/ShippingAddress';
import ShippingMethodSelector from '../components/checkout/ShippingMethodSelector';
import { getConfig } from '../config';
import { useCartContext } from '../context/useCartContext';
import { usePaymentContext } from '../context/usePaymentContext';
import { Button } from 'react-native-paper';
import OrderTotal from '../components/checkout/OrderTotal';

const Checkout = () => {
    const { cart } = useCartContext();
    const router = useRouter();
    const { startCheckout, confirmationData, convertCartToOrder, cancelPayment } = usePaymentContext()

    const buyNowEnabled = cart?.email && cart?.billingAddress && (cart?.isShippingRequired ? cart?.shippingAddress : true)

    useEffect(() => {
        if (confirmationData) {
            initializePaymentSheet().then(() => openPaymentSheet())
        }
    }, [confirmationData])


    if (!cart || cart.lines.length === 0) {
        return <View style={styles.wrapper}>
            <PaddedView style={styles.rowWrapper}>
                <Text style={styles.title}>Empty Cart:</Text>
            </PaddedView>
            <PaddedView style={styles.rowWrapper}>
                <Text>
                    Cannot checkout an empty cart
                </Text>
            </PaddedView>
            <PaddedView style={styles.rowWrapper}>
                <Button onPress={() => router.push("/")} mode="contained" style={styles.checkoutButton}>Go to dashboard</Button>
            </PaddedView>

            <Divider />
        </View>
    }

    const initializePaymentSheet = async () => {
        if (!confirmationData || !cart) {
            return
        }
        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            paymentIntentClientSecret: confirmationData.client_secret,

            defaultBillingDetails: {
                address: {
                    city: cart.billingAddress?.city,
                    postalCode: cart.billingAddress?.postalCode,
                }
            }

        });
        if (error) {
            if (error.code === PaymentSheetError.Canceled) {
                cancelPayment()
            }
            if (error.code === PaymentSheetError.Failed) {
                cancelPayment()
            }
            Alert.alert(`Error code: ${error.code}`, error.message);

            return false
        }

        return true
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            if (error.code === PaymentSheetError.Canceled) {
                cancelPayment()
            }
            if (error.code === PaymentSheetError.Failed) {
                cancelPayment()
            }
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
            convertCartToOrder().then((result) => router.push("orderDetails/" + result.orderId + "?orderSuccess=true"))
        }
    };

    const buyNow = () => {
        if (!buyNowEnabled) {
            Alert.alert("Please fill in required information to contiue");
            return
        }
        if (confirmationData) {
            openPaymentSheet()
        } else {
            startCheckout()
        }
    }


    return <StripeProvider publishableKey={getConfig().stripePK}>
        <SafeAreaView style={styles.container} testID="cart-list-safe" >
            <ScrollView testID="cart-list-scroll">
                <PaddedView style={{marginTop: 12}}>
                    <Text style={styles.termsText}>By placing your order you agree to the Saleor App's Terms and Conditions of Awesomeness. Please see our Privacy Lotus, our Cookie Recipes for more details.</Text>
                    <Button mode="contained" onPress={buyNow}>
                        Buy Now
                    </Button>
                </PaddedView>
                <OrderTotal />
                <PersonalDetails />
                <BillingAddress />

                {cart?.isShippingRequired && <>
                    <ShippingAddress />
                    <ShippingMethodSelector />
                </>}
            </ScrollView >
        </SafeAreaView >
    </StripeProvider>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkoutButton: {
        width: "100%",
    },
    termsText: {
        fontSize: 12,
        color: colors.greyText,
        marginBottom: 16
    },
    wrapper: {
        border: "0.5 solid " + colors.dividerGrey,
        borderRadius: 5,
        margin: 8,
        paddingTop: 8,
        paddingBottom: 8,
    },
    icon: {
        marginTop: 5,
        marginRight: 5,
    },
    rowWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 5,
    },
    title: {
        fontWeight: "bold",
        fontSize: 16
    }
});

export default Checkout