# Degree Planner (mobile)

React Native (Expo) mobile app for planning and tracking degree progress. The UI matches the **Degree planner app wireframe** (Figma): Home, Schedule, AI Assistant/Chatbot, Courses, and More, with a bottom tab bar and raised center chat button.

## Requirements

- **Node.js** 20.19.x or later  
- **Expo Go** (SDK 54) on your device — install from [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) or [App Store](https://apps.apple.com/app/expo-go/id982107779). The app targets **SDK 54** so it works with the store version of Expo Go.  
- **Android (USB)**: [ADB](https://developer.android.com/tools/adb) on your computer (e.g. via [Android Studio](https://developer.android.com/studio) or [Platform tools](https://developer.android.com/tools/releases/platform-tools)) for `npm run start:usb`.

## Setup

```bash
npm install
```

## Running the app

```bash
npm start
```

Then:

- **Web**: Press `w` in the terminal, or run `npm run web`.
- **Mobile**: Scan the QR code with Expo Go (same Wi‑Fi as your computer).

### Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start Expo dev server (LAN + web) |
| `npm run start:usb` | Start with USB reverse tunnel for Android (see below) |
| `npm run start:tunnel` | Start with ngrok tunnel (if LAN is blocked) |
| `npm run web` | Start and open in browser |
| `npm run android` | Run on Android device/emulator |
| `npm run ios` | Run on iOS simulator (Mac only) |

## Mobile on restricted networks (e.g. university Wi‑Fi)

Device-to-device connections are often blocked. Use **USB** so the phone talks to your machine over the cable:

**Android**

1. Connect the phone with a USB cable.
2. On the phone: **Settings → Developer options** → turn on **USB debugging**.
3. On your computer:
   ```bash
   npm run start:usb
   ```
4. In Expo Go, tap **“Enter URL manually”** and enter: `exp://localhost:8081`

**iOS**  
Use the iOS simulator from Xcode on a Mac, or try `npm run start:tunnel` if your network allows outbound tunnel traffic.

## App structure

- **Top bar**: Menu / Back, screen title (e.g. UTDCourses, Schedule, AI Assistant), Profile.
- **Tabs**: Home, Schedule, **Chat** (center raised button), Courses, More.
- **Screens**: Home (progress + semester + quick stats), Schedule (week + days + grid), Courses (search, filters, list), Chatbot, More (Settings, Help, etc.). Profile, Settings, and Help open from More or the top bar.

## Tech stack

- **Expo** SDK 54  
- **React Native** 0.81  
- **React** 19.1  
- **TypeScript**  
- **react-native-safe-area-context**, **expo-status-bar**, **@expo/vector-icons**
