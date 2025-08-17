# Uber Clone

This is a React Native Uber Clone built with Expo, TypeScript, NativeWind, and EAS Build.

## 🚀 Getting Started (Installation)

Follow these steps to set up and run the project locally:

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd uber-clone
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

- Copy `.env.example` to `.env.local` (if provided) and fill in your API keys and secrets.
- Make sure you have a valid Google Maps API key and any other required keys.

### 4. Start the Expo development server

```bash
npx expo start
```

### 5. Run on your device or emulator

- For Android: Press `a` in the Expo CLI or scan the QR code with your Expo Go app or custom dev client.
- For iOS: Press `i` in the Expo CLI (Mac only) or scan the QR code with Expo Go.

---

# Uber Clone - EAS Build Setup Guide

This guide will help you set up and build your custom Expo development client using EAS (Expo Application Services).

## Prerequisites

- Node.js and npm installed
- Expo CLI installed globally (`npm install -g expo-cli`)
- EAS CLI installed globally (`npm install -g eas-cli`)
- Android Studio (for emulator and keytool)
- A Google Cloud project with Maps and Places APIs enabled

## Step-by-Step: EAS Build for Development Client

### 1. Install EAS CLI (if not already)

```bash
npm install -g eas-cli
```

### 2. Log in to your Expo account

```bash
eas login
```

### 3. Configure your project for EAS

```bash
eas init
```

Follow the prompts to set up your project.

### 4. Set up your Android keystore

If EAS cloud keystore generation fails, generate one locally:

```bash
keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

- Save the password, alias, and keystore file.
- During EAS build, choose to upload your own keystore and provide these details.

### 5. Build the development client

```bash
eas build --profile development --platform android
```

- Wait for the build to finish. Download the APK from the provided link.

### 6. Install the APK on your device

- With USB debugging enabled and adb installed:

```bash
adb install path/to/your-app.apk
```

- Or transfer the APK to your device and open it to install.

### 7. Start your local development server

```bash
npx expo start
```

- Scan the QR code or select the local server in your dev client app.

### 8. Troubleshooting

- Ensure your Google Maps/Places API key is enabled and unrestricted for development.
- Add required permissions in `app.json`:

```json
"android": {
  "permissions": ["ACCESS_FINE_LOCATION", "ACCESS_COARSE_LOCATION", "INTERNET"]
}
```

- Rebuild your dev client after adding new native modules.

---

For more details, see the [Expo EAS Build docs](https://docs.expo.dev/build/introduction/).
