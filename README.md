# chat-app
 
## Objective

To build a chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their
location.

## Tech used  
- React Native
- Expo App
- Android Emulator

## User Stories

1. As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
friends and family.
2. As a user, I want to be able to send messages to my friends and family members to exchange
the latest news.
3. As a user, I want to send images to my friends to show them what I’m currently doing.
4. As a user, I want to share my location with my friends to show them where I am
5. As a user, I want to be able to read my messages offline so I can reread conversations at any
time.
6. As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface

## Development Process

### Setup Expo as Development Environment

1. Install Expo CLI

```
npm install expo-cli --global
```

2. Create a new expo project

```
expo init [projectname]
```

3. Navigate to the project

```
cd [projectname]
```

4. Start expo project

```
npx expo start
```

### Install React Navigation library to navigate between screens

1. Navigate to project folder and run

```
npm install react-navigation
```

2. Install necessary dependencies

```
npm install @react-navigation/native @react-navigation/stack
expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```
### Set up Android Studio as Android Emulator

1. Download Android Studio
2. Make sure 'Android Virtual Device' is installed
3. Create virtual device and click play to start
4. Select 'Run app on Android' in Expo to run app on virtual device

### Install React Native Gifted Chat 

1. Install React Native Gifted Chat

```
npm install react-native-gifted-chat --save
```


