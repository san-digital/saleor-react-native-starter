import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme, LogBox } from "react-native";
import { colors } from "../components/Themed";
import SearchHeader from "../components/layout/SearchHeader";
import { CartProvider } from "../context/useCartContext";
import { OrderProvider } from "../context/useOrderContext";
import { PaymentProvider } from "../context/usePaymentContext";
import { ProductsProvider } from "../context/useProductContext";
export {
  ErrorBoundary
} from "expo-router";
import { getConfig } from "../config";
import SimpleBackHeader from "../components/layout/SimpleBackHeader";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}
LogBox.ignoreAllLogs();

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const apiUrl = getConfig().saleorApi;

  const apolloClient = new ApolloClient({
    uri: apiUrl,
    cache: new InMemoryCache(),
  });

  const baseHeaderProps = {
    headerTitle: "",
    header: () => <SimpleBackHeader />
  }

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <ProductsProvider>
          <CartProvider>
            <OrderProvider>
              <PaymentProvider>
                <ThemeProvider
                  value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
                >
                  <Stack >
                    <Stack.Screen name="(tabs)" options={{

                      header: () => <SearchHeader withBack={false} cleanSearch />
                    }} />
                    <Stack.Screen name="products/results" options={{
                      headerStyle: {
                        backgroundColor: colors.header,
                      }, header: () => <SearchHeader withBack />
                    }} />
                    <Stack.Screen name="products/details/[id]" options={baseHeaderProps} />
                    <Stack.Screen name="checkout" options={{ ...baseHeaderProps, headerTitle: "Checkout", }} />
                    <Stack.Screen name="personalDetails" options={baseHeaderProps} />
                    <Stack.Screen name="shippingAddress" options={baseHeaderProps} />
                    <Stack.Screen name="billingAddress" options={baseHeaderProps} />
                    <Stack.Screen name="shippingMethods" options={baseHeaderProps} />
                    <Stack.Screen name="orderDetails/[id]" options={baseHeaderProps} />
                    <Stack.Screen name="modal" options={{ presentation: "modal" }} />
                  </Stack>
                </ThemeProvider>
              </PaymentProvider>
            </OrderProvider>
          </CartProvider>
        </ProductsProvider>
      </ApolloProvider>
    </>
  );
}
