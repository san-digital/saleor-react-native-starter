import AsyncStorage from "@react-native-async-storage/async-storage";


const key = '@SaleorApp:CheckoutId'

export const getCheckoutId = async () => {
    return await AsyncStorage.getItem(
        key
    );
}
export const setCheckoutId = async (checkoutId: string) => {
    await AsyncStorage.setItem(
        key,
        checkoutId
    );
}
export const removeCheckoutId = async () => {
    await AsyncStorage.removeItem(
        key
    );
}