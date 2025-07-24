# 🍔 DelishGo — The Food Delivery App

![DelishGo](./screenshots/banner.png)

[![React Native](https://img.shields.io/badge/Built%20With-React%20Native-blue.svg)](https://reactnative.dev/)
[![Firebase](https://img.shields.io/badge/Backend-Firebase-FFCA28.svg)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A modern, feature-rich food delivery app built with **React Native CLI**, featuring Firebase Authentication, Firestore, Google Maps, Cart functionality, Category-based browsing, and more — inspired by Swiggy/Zomato.

---

## ✨ Features

- 🔐 **Authentication** — Sign in / Register with Email or Google
- 📍 **Location Picker** — Use Google Maps to pick delivery address
- 🍽️ **Food & Restaurant Listing** — Categorized & filtered menu
- 🛒 **Add to Cart** — Smart cart with quantity control
- 🧾 **Order Summary** — Preview orders before checkout
- 🔍 **Search & Filters** — Find dishes and restaurants quickly
- 🌗 **Beautiful UI** — Clean, animated, modern UI/UX

---

## 📸 Screenshots

| Splash Screen | Home Screen | Restaurant Details | Cart |
|---------------|-------------|---------------------|------|
| ![](./screenshots/splash.png) | ![](./screenshots/home.png) | ![](./screenshots/restaurant.png) | ![](./screenshots/cart.png) |

> 📂 Place all screenshots inside a `/screenshots` folder in your repo.

---

## 🛠️ Tech Stack

- **Frontend:** React Native CLI, Redux Toolkit, React Navigation
- **Backend:** Firebase Authentication, Firestore DB
- **Notifications:** Firebase Cloud Messaging (FCM)
- **Location:** React Native Maps, Geolocation
- **UI Components:** React Native Paper, Custom Styling

---

## 📦 Installation

```bash
# 1. Clone the repo
git clone https://github.com/Abhay-singh-rathore/DelishGo--The-Food-Delivery-App.git
cd DelishGo--The-Food-Delivery-App

# 2. Install dependencies
npm install

# 3. Link native dependencies (only for older RN versions)
npx react-native link

# 4. Run on Android
npx react-native run-android

# 5. Run on iOS (Mac only)
npx react-native run-ios
