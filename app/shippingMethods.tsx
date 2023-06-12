import * as React from 'react';
import { Button, RadioButton } from 'react-native-paper';
import { PaddedView, Text } from '../components/Themed';
import { getConfig } from '../config';
import { useCartContext } from '../context/useCartContext';
import { useCheckoutShippingMethodUpdateMutation } from '../saleor/api.generated';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

const ShippingMethods = () => {

    const { cart, refreshCart } = useCartContext()
    const [shippingAddressUpdate] = useCheckoutShippingMethodUpdateMutation()
    const router = useRouter()

    const shippingMethods = cart && cart.shippingMethods

    const firstMethod = shippingMethods && shippingMethods?.length > 0 ? shippingMethods[0].id : undefined

    const [checked, setChecked] = React.useState(firstMethod || "");

    const updateShippingMethod = async () => {
        await shippingAddressUpdate({
            variables: {
                id: cart?.id as string,
                shippingMethodId: checked
            }
        })
        await refreshCart()
        router.back()
    }

    return (
        <PaddedView>
            <Text style={styles.title}>Choose shipping method</Text>
            <RadioButton.Group onValueChange={value => setChecked(value)} value={checked}>
                {shippingMethods?.map(method => {
                    const price = method.price.amount.toLocaleString(getConfig().locale, {
                        style: "currency",
                        currency: method.price.currency
                    })
                    return <RadioButton.Item label={method.name + "\n" + price} value={method.id} />
                })}
            </RadioButton.Group>
            <Button
                mode="contained"
                style={{ marginTop: 8, marginBottom: 8 }}
                onPress={() => updateShippingMethod()}>
                Submit
            </Button>
        </PaddedView>
    );
};

export default ShippingMethods;

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        marginTop: 8
    }
})