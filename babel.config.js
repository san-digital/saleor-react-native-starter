module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      require.resolve("expo-router/babel"),
      'transform-inline-environment-variables',
      [
        'react-native-reanimated/plugin', {
          relativeSourceLocation: true,
        },
      ]
    ],
  };
};
