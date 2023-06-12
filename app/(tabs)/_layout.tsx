import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useColorScheme, StyleSheet } from 'react-native';

import { Text, View } from './../../components/Themed';
import Colors from '../../constants/Colors';
import { useCartContext } from '../../context/useCartContext';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  number?: number
}) {
  return <View style={{ position: "relative" }}>
    <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
    {props.number && <Text style={styles.cartCountIcon}>{props.number}</Text>}
  </View>

}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerStyle: {
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-bag" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => {
            const { cart } = useCartContext()
            return <TabBarIcon name="shopping-cart"
              color={color}
              number={cart && cart.lines.length > 0 ? cart.lines.map(line => line.quantity).reduce((prev, curr) => prev + curr, 0) : undefined}
            />
          },
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  cartCountIcon: {
    position: 'absolute',
    right: -20
  },
});
