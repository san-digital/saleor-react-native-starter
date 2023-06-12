import Constants from 'expo-constants';

export const getConfig = () => {
    return {
        channel: Constants.expoConfig?.extra?.channel,
        stripePK: Constants.expoConfig?.extra?.stripePK,
        locale: Constants.expoConfig?.extra?.locale,
        saleorApi: Constants.expoConfig?.extra?.saleorApi
    }
}