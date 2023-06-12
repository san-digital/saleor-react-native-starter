/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, useColorScheme, View as DefaultView, StyleProp } from 'react-native';

import Colors from '../constants/Colors';
import { FC, PropsWithChildren } from 'react';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function PaddedView(props: ViewProps) {
  const { style, ...otherProps } = props;

  return <View style={[{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }, style]} {...otherProps} />;
}

interface DividerProps {
  style?: any
}

export function Divider(props: DividerProps) {
  return <View
    style={{
      marginTop: 10,
      marginBottom: 10,
      borderBottomColor: colors.dividerGrey,
      borderBottomWidth: 0.5,
      ...(props.style || {})
    }}
  />
}

export const colors = {
  dividerGrey: 'rgb(216, 216, 216)',
  textInputGreyBackground: '#F2F4F5',
  textInputGrey: '#6C7072',
  greyText: 'rgb(153, 153, 153)',
  blue: "#007AFF",
  header: "red"
}