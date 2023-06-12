# Saleor Mobile App
A GraphQL-powered, mobile native application storefront for Saleor.

Intended to be used with Saleor Cloud seed data.

# Features
A headless ecommerce storefront built with GraphQL, Apollo Client, React Native, and Typescript, the following features are implemented:

- Saleor GraphQL API integration
- Auto generate graphql typescript bindings
- Stripe integration with Saleor payment gateway integration

# Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
- Node.js 14.16
- Xcode and Android Studio Emulator
- A Saleor cloud instance or running instance of Saleor.
  - Saleor cloud seed data required
  - Saleor Stripe plugin configured
- A Stripe account.

### Xcode and Android Studio
To run the app in both ios and android emulators, follow setup instructions below,

[https://docs.expo.dev/workflow/android-studio-emulator/](https://docs.expo.dev/workflow/android-studio-emulator/)

[https://docs.expo.dev/workflow/ios-simulator/](https://docs.expo.dev/workflow/ios-simulator/)

Note running Expo in web mode is not supported for this starter.

### Configuring Saleor
A Saleor cloud instance can be easily configured following this guide, [https://docs.saleor.io/docs/3.x/cloud](https://docs.saleor.io/docs/3.x/cloud).

Once setup the instance of Saleor Cloud should come with seeded test data that can immediately viewed in the mobile app. To do this simply update the environment variable with the name chosen for your saleor instance (`xxx` below).
```
SALEOR_API_URL=https://xxx.eu.saleor.cloud/graphql/
```

(See Development section below)

#### Updating collection for dashboard banner
For the mobile app to look more professional we added a simple image to the seeded collection "Summer Picks".

### Configuring Stripe Saleor Plugin
(Detailed information can be found [here](https://docs.saleor.io/docs/3.x/developer/available-plugins/stripe))

- Navigate to Stripe Developer config -> Api Keys
    - Here [https://dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
    - Copy Stipe Publishable Key and Secret Key
- Navigate to Saleor Apps
    - Here [https://xxx.eu.saleor.cloud/dashboard/plugins/?asc=true&sort=name](https://xxx.eu.saleor.cloud/dashboard/plugins/?asc=true&sort=name)
    - Find Stripe plugin
    - Set plugin active
    - Paste in public key
    - Create secret key

## Development
Setup your .env file
- `cp .env.example .env`
- Replace Saleor api with your saleor intstance
- Replace Stripe PK with your own stripe primary key

Generate GraphQL apis from schema
- `yarn generate`

(Note, `ctrl + c` is required to exit generate process)

Debug in ios for dev mode
- `yarn ios`

Debug in androis for dev mode
- `yarn android`

### Reloading the app
When starting via `yarn android` or `yarn ios` to force reload the app. Focus on the terminal and type `r`.

## Modifying Saleor API requests
Navigate to `/graphql` and view contents of `*.graphql` files.

## Single channel
The react native app is designed to work with a single saleor channel, the channel can be changed by modifying the `CHANNEL` variable and building the app.

Mulitchannel not supported.

## Building
TBC