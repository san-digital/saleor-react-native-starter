# Saleor Mobile App
A GraphQL-powered, mobile native application storefront for Saleor.

Intended to be used with Saleor Cloud seed data

# Features
Headless ecommerce storefront built with GraphQL, Apollo Client, React Native, and Typescript
- Saleor GraphQL API integration
- Auto generate graphql typescript bindings
- Stripe integration with Saleor payment gateway integration

# Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
- Node.js 14.16
- A Saleor cloud instance or running instance of Saleor.
  - Saleor cloud seed data required
  - Saleor Stripe plugin configured
- A Stripe account.

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

Debug in ios for dev mode
- `yarn ios`

Debug in androis for dev mode
- `yarn android`

### Reloading the app
When starting via `yarn android` or `yarn ios` to force reload the app. Focus on the terminal and type `r`.

## Modifying Saleor API requests
Navigate to `/graphql` and view contents of `*.graphql` files.

## Single channel
The react native app is designed to work with a single channel, the channel can be changed by modifying the `CHANNEL` variable and building the app.

Mulitchannel not supported.

## Building
TBC