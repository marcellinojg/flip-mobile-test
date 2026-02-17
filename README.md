# Flip Mobile Test

Expo (React Native) app with transaction list and detail screens.

## Run locally

### 1. Install dependencies

```bash
yarn install
```

### 2. Choose how to run

**Development (native build — recommended)**

Uses a native dev build so you get the full native stack (e.g. for native modules or performance):

```bash
yarn prebuild
yarn ios
# or
yarn android
```

- **iOS:** Xcode and iOS simulator (or device) required.
- **Android:** Android Studio and emulator (or device) required.

**Non‑development (Expo Go)**

Runs the dev server; you open the app in Expo Go (no prebuild):

```bash
yarn start
```

Then:

- Press **`i`** to open in iOS simulator (with Expo Go installed), or
- Press **`a`** for Android emulator, or
- Scan the **QR code** with Expo Go on a physical device.

No native build step; best for quick checks and sharing a build.

## Environment

The app uses `EXPO_PUBLIC_API_URL` from a `.env` file for the transactions API. Add a `.env` with this variable if the API is required.

## Scripts

| Command         | Description                     |
| --------------- | ------------------------------- |
| `yarn install`  | Install dependencies            |
| `yarn prebuild` | Generate native iOS/Android     |
| `yarn ios`      | Run on iOS (after prebuild)     |
| `yarn android`  | Run on Android (after prebuild) |
| `yarn start`    | Start Metro / Expo Go           |
| `yarn lint`     | Run ESLint                      |
