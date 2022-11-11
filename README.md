# **ChatApp**

## **Project Description**

This project is a chat app for mobile devices built using React Native. The app has a chat interface for users with options to share images and their location.

## Tech Used

- React Native
- Expo/Expo Go
- Android Emulator

## User Stories

- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
  friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange
  the latest news
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any
  time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen
  reader so that I can engage with a chat interface.

## Key Features

- A page where users can enter their name and choose a background color for the chat screen
  before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images
  and location data.
- Data gets stored online and offline.

## Setup

1. Clone this repository

2. Install Expo with

```
$ npm install expo-cli --global
```

3. Navigate to the cloned project's root folder and run

```
$ npm install
```

4. Sign up for Expo @ https://expo.dev/

5. Install Expo on phone (Search for the Expo app in the relevant app store for your device (iOS or Android) & download.)

6. Back in project folder/terminal run

```
$ expo start
```

7. Use phone/Expo Go app to scan QR code

8. Create Firebase Database

- Go to Google Firebase and login with Google account (or register for one if need be)
- Go to Firebase console and create a new project
- From Firebase dashboard click on **Build** from left side panel, then **Firestore Database**, then **Create Database**
- Follow instructions and create new database **IN TEST MODE**
- Create a new collection called "messages"
- Under **Project Settings** (gear icon) click **Firestore for Web** button (</> icon) and register your new app per screen instructions
- Copy the contents of the Firebase configuration (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId) and replace the contents in the "Chat.js" file
- From Firebase dashboard click on **Build** from left side panel, then **Authentication**, then **Set up sign-in method** and enable anonymous authentication
- From Firebase dashboard click on **Build** from left side panel, then **Storage** and create a new storage space in the same fashion you created the **Firestore Database**

9. **Setup is now complete!!!** and app should be fully functional

### Set up Android Studio as Android Emulator (alternative to Expo Go)

1. Download Android Studio
2. Set Up Android Emulator
3. Configure Android Studio from the Welcome Screen
4. Create Virtual Device
5. Start Your Emulator

### Dependencies

```

"@react-native-async-storage/async-storage": "^1.17.10",
    "@react-native-community/masked-view": "^0.1.11",
    "@react-native-community/netinfo": "9.3.0",
    "@react-navigation/native": "^6.0.13",
    "@react-navigation/stack": "^6.3.1",
    "expo": "~46.0.13",
    "expo-status-bar": "~1.4.0",
    "firebase": "^8.0.1",
    "react": "18.0.0",
    "react-native": "0.69.6",
    "react-native-gesture-handler": "~2.5.0",
    "react-native-gifted-chat": "^1.0.4",
    "react-native-paper": "^4.12.5",
    "react-native-reanimated": "~2.9.1",
    "react-native-safe-area-context": "4.3.1",
    "react-native-screens": "~3.15.0",
    "react-navigation": "^4.4.4",
    "expo-permissions": "~13.2.0",
    "expo-image-picker": "~13.3.1",
    "expo-location": "~14.3.0",
    "react-native-maps": "0.31.1"
```
