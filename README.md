# Expo Starter with Router

[![CI](https://github.com/dooboolab-community/expo-router-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/dooboolab-community/expo-router-starter/actions/workflows/ci.yml)

The `expo` template generated with `dooboo-cli`.

We believe that the fastest way to build the app is using [Expo](https://expo.io).
You can create app even more easily with the cli tool [dooboo-cli](https://github.com/dooboolab-community/dooboo-cli).

## Stacks used

- [react-native](https://github.com/facebook/react-native)
- [expo-router](https://expo.github.io/router)
- [emotion](https://emotion.sh)
- [dooboo-ui](https://github.com/dooboolab/dooboo-ui)
- [jest](https://github.com/facebook/jest)
- [react-native-testing-library](https://github.com/callstack/react-native-testing-library)
- [typescript](https://github.com/Microsoft/TypeScript)
- [ts-jest](https://github.com/kulshekhar/ts-jest)
- [prettier](https://prettier.io)
- [react-native-web](https://github.com/necolas/react-native-web)
- [expo-localization](https://docs.expo.dev/versions/latest/sdk/localization)

## Quick News

- In default, [dooboo-ui](https://github.com/dooboolab/dooboo-ui) ui framework is preinstalled in the project. Hope you like it 🧡.

## Development Guide

### Expo Auth Session

In simpler terms, starting from version 48 of the Expo, there's an issue with the package called [expo-auth-session](https://docs.expo.dev/versions/latest/sdk/auth-session/#installation) when used in an app that is managed by Expo (for details, see this [issue link](https://github.com/expo/expo/issues/21437)). To avoid this problem, it's a good idea to use [expo-dev-client](https://docs.expo.dev/develop/development-builds/introduction).

### Expo Dev Client

To elaborate further, Expo offers a feature where you can create a special kind of build for development purposes. This is helpful because it allows you to use additional pieces of code (modules) written for React Native, which usually wouldn't work in an Expo-managed app without going through some complex steps or taking on the responsibility of handling the native code yourself. The [expo-dev-client](https://docs.expo.dev/develop/development-builds/introduction) helps to get around these issues, making it easier for you to work with external React Native modules in a more straightforward way.

You can create the dev client by running the script
```sh
eas:dev:ios
// or
npx eas build --profile development --platform ios
```

For android,
```sh
eas:dev:android
// or
eas build --profile development --platform android
```


In case your build process fails due to the presence of `google-services.json` and `GoogleService-Info.plist` files in the `.gitignore` file, you can try a temporary fix. Simply remove these files from `.gitignore` and re-run the build commands. Once the build succeeds, make sure to add them back to `.gitignore`. This is important because these files shouldn't be part of the version control.

After the development build is finished, head to [Expo's website](https://expo.io) to download it. If you are working on an iOS app, you can find guidance on how to install your build on simulators through [this link](https://docs.expo.dev/build-reference/simulators/#installing-your-build-on-the-simulator). For Android, check out [this link](https://docs.expo.dev/build-reference/apk) which provides steps for creating APKs for emulators and devices.

## Firebase setting 

In order to use this project, please follow the configuration guide below 

1. Create .env file
```sh
cp .env.sample .env
```

2. Create a new firebase project and add following values
- apiKey 
- authDomain
- projectId
- storageBucket
- messagingSenderId
- appId
- measurementId

you can find these options in 

```sh
firebase -> [your project name] -> web app -> project setting
```
3. Add Google Client id
 * web
 * ios
 * android
   
4. Add Facebook app id (developer.facebook.com/apps/) 
