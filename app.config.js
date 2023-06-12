module.exports = {
    "extra": {
        saleorApi: process.env.SALEOR_API_URL || "",
        stripePK: process.env.STRIPE_PK || "",
        channel: process.env.CHANNEL || "",
        locale: process.env.LOCALE?.split(",") || [],
    },
    "plugins": [
        [
            "@stripe/stripe-react-native",
            {
                "merchantIdentifier": "",
                "enableGooglePay": false
            }
        ]
    ],
    "name": "exposhop",
    "slug": "exposhop",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "splash": {
        "image": "./assets/images/saleor-splash.png",
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
        "**/*"
    ],
    "ios": {
        "supportsTablet": true
    },
    "android": {
        "adaptiveIcon": {
            "foregroundImage": "./assets/images/adaptive-icon.png",
            "backgroundColor": "#ffffff"
        }
    },
    "web": {
        "bundler": "metro",
        "favicon": "./assets/images/favicon.png"
    }
};