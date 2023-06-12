import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { getConfig } from "../config";
import { CheckoutFragment, useCheckoutLinesAddMutation, useCheckoutLinesUpdateMutation, useCreateCheckoutMutation, useGetCheckoutByIdLazyQuery } from "../saleor/api.generated";
import { getCheckoutId, removeCheckoutId, setCheckoutId } from "./basketStore";
import {
    handleErrors,
} from "./checkout";

interface CartContextModel {
    cart: CheckoutFragment | undefined;
    loaded: boolean | undefined;
    loading: boolean | undefined;
    refreshCart: () => Promise<CheckoutFragment | undefined>;
    removeCart: () => Promise<void>;
    setCart: (cart: CheckoutFragment) => void;
    addItem: (variantId: string) => Promise<void>;
    updateItemQuantity: (variantId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextModel>({
    cart: undefined,
    loading: undefined,
    loaded: undefined,
    addItem: () => Promise.resolve(),
    removeCart: () => Promise.resolve(),
    setCart: () => Function,
    refreshCart: () => Promise.resolve(undefined),
    updateItemQuantity: () => Function,
});

export const useCartContext = () => useContext(CartContext);

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    const [loading, setLoading] = useState<boolean | undefined>(undefined);
    const [loaded, setLoaded] = useState<boolean | undefined>(undefined);
    const [cart, setCart] = useState<CheckoutFragment | undefined>(undefined);

    const [getCheckoutById, options] = useGetCheckoutByIdLazyQuery()
    const [createCheckout] = useCreateCheckoutMutation();
    const [addLineItem] = useCheckoutLinesAddMutation();
    const [updateLineMutation] = useCheckoutLinesUpdateMutation();

    const getCheckout = async () => {
        const result = await getCheckoutById({ variables: { id: (await getCheckoutId()) || "none" } });
        handleErrors(result)
        return result.data?.checkout as CheckoutFragment;
    }

    useEffect(() => {
        refreshCart();
    }, []);

    const checkCheckoutExists = async () => {
        try {
            const result = await getCheckout();
            if (!result) {
                setCart(undefined);
                await removeCheckoutId()
                return undefined;
            }
            return result;
        } catch (e) {
            console.error(e);
            await removeCheckoutId()
            setCart(undefined);
        }
    };

    const addItem = async (variantId: string) => {
        setLoading(true);
        const cart = await checkCheckoutExists();

        if (cart) {
            const updatedCart = await addLineItem({
                variables: {
                    id: cart.id,
                    lines: [{
                        variantId,
                        quantity: 1
                    }]
                }
            });
            setCart(updatedCart.data?.checkoutLinesAdd?.checkout as CheckoutFragment);
            setLoading(false);

        } else {
            const updatedCart = await createCheckout({
                variables: {
                    channel: getConfig().channel,
                    lines: [{
                        variantId,
                        quantity: 1
                    }]
                }
            });

            await setCheckoutId(updatedCart.data?.checkoutCreate?.checkout?.id as string)

            setCart(updatedCart.data?.checkoutCreate?.checkout as CheckoutFragment);
            setLoading(false);
        }

        await refreshCart();
    };

    const updateItemQuantity = async (lineId: string, quantity: number) => {
        setLoading(true);
        console.log(lineId, quantity)

        const updatedCart = await updateLineMutation(
            {
                variables: {
                    id: cart?.id as string,
                    lines: [{
                        lineId,

                        quantity
                    }]
                }
            }


        );

        if (updatedCart.errors || (updatedCart.data?.checkoutLinesUpdate?.errors && updatedCart.data?.checkoutLinesUpdate?.errors.length > 0)) {
            Alert.alert("Error", "There was an error updating your cart")
        }
        setCart(updatedCart.data?.checkoutLinesUpdate?.checkout as CheckoutFragment);
        setLoading(false);
    };

    const refreshCart = async () => {
        setLoading(true);

        try {
            const newCart = await getCheckout();

            setCart(newCart);
            setLoading(false);
            setLoaded(true);
            return newCart;
        } catch (e) {
            console.error(e);
        }

        setLoading(false);
        setLoaded(true);
        setCart(undefined);
        return undefined;
    };

    const removeCart = async () => {
        await removeCheckoutId();
        setCart(undefined)
    }

    return (
        <CartContext.Provider value={{ cart, addItem, removeCart, updateItemQuantity, refreshCart, loading, setCart, loaded }}>
            {children}
        </CartContext.Provider>
    );
};
