# 🍔 DelishGo — The Food Delivery App

<img src="./screenshots/banner.png" alt="DelishGo Banner" width="100%" />

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

<table>
  <tr>
    <td><img src="./screenshots/Screenshot_1.png" width="200" /></td>
    <td><img src="./screenshots/Screenshot_2.png" width="200" /></td>
    <td><img src="./screenshots/Screenshot_5.png" width="200" /></td>
    <td><img src="./screenshots/Screenshot_8.png" width="200" /></td>
  </tr>
  <tr>
    <td>Splash Screen</td>
    <td>Home Screen</td>
    <td>Restaurant Details</td>
    <td>Cart</td>
  </tr>
  <tr>
    <td><img src="./screenshots/Screenshot_4.png" width="200" /></td>
    <td><img src="./screenshots/Screenshot_9.png" width="200" /></td>
    <td><img src="./screenshots/Screenshot_6.png" width="200" /></td>
    <td></td>
  </tr>
  <tr>
    <td>Add Item</td>
    <td>Address Screen</td>
    <td>Order Details</td>
    <td></td>
  </tr>
</table>

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
