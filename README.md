# 🌍 TravelFever

## 📌 Project Overview

**Application Name:** TravelFever
**Category:** Travel App
**OS** Android

### 🎯 Main Purpose

TravelFever is a mobile application designed to help users discover new travel destinations and share their personal travel experiences. The app provides quick access to trending destinations worldwide and allows users to retrieve detailed information about countries, cities, and points of interest (POIs).

Users can create and publish their own trips, upload images, and describe their experiences, building a personalized digital travel journal.

---

# 🚀 Getting Started

## 📦 Installation

```bash
npm install
```

## ▶️ Available Scripts

### Start Android (clear cache)

```bash
npm run startAndroid
```

### Standard Start

```bash
npm run start
```

### Start Locally

```bash
npm run startLocal
```

### Run Android (native build)

```bash
npm run android
```

### Run iOS

```bash
npm run ios
```

### Run Web

```bash
npm run web
```

### Rebuild Android

```bash
npm run rebuild
```

---

## 📱 Production APK (Fully Working Application)

**Download APK:**
https://expo.dev/artifacts/eas/h89dYV38pyFKEu5RkzSiW7.apk

The application is fully functional.

---

## 🔗 Backend Repository

The backend is a custom **Express.js** server, deployed on **Render**.

👉 https://github.com/antonDinkov/TravelFeverBE.git

---

# 👤 User Access & Permissions

## Guest (Not Authenticated)

* Sees a welcome screen with a **Start** button.
* Can navigate to:

  * Login screen
  * Register screen

## Authenticated User

Has access to:

* 🏠 Home
* ❤️ Favorites
* 🧳 My Trips
* 👤 Profile
* ⚙️ Settings

Each section includes sub-screens and modals where necessary.

---

# 🔐 Authentication & Session Handling

## Authentication Flow

* The user chooses between Login or Register.
* After successful authentication:

  * The backend returns user data and an access token.
  * The token is stored securely and restored during app initialization.
* A custom hook monitors token presence and controls authentication state.
* Logout:

  * Sends a request to the backend.
  * Clears AsyncStorage.
  * Works even offline.
* On app restart:

  * The hook checks for an existing token.
  * Automatically restores the session if valid.

## Session Persistence

* The session is stored in AsyncStorage.
* Automatic login is handled by checking the stored token during app initialization.

---

# 🧭 Navigation Structure

## Root Navigation Logic

Navigation is controlled by authentication state:

```jsx
<ThemeLayout>
  {isAuthenticated ? <GlobalStackNavigator /> : <AuthNavigator />}
</ThemeLayout>
```

## Main Navigation

* Root Stack Navigator (handles global modals)
* Bottom Tab Navigator (5 main tabs)
* Two tabs contain nested Stack Navigators with dynamic data handling

## Nested Navigation

* Stack inside Tabs
* Animated modals for details
* Dynamic screens with data-driven rendering

---

# 📋 List → Details Flow

## Home Screen

* Displays popular destinations as cards.
* Includes a search bar for destinations.
* Search results are rendered dynamically as cards.

### Data Source

* Main storage: MongoDB Atlas
* First search:

  * Fetches data from external APIs (Pixabay, Wikipedia, GeoAPI)
* Results are cached in the database.
* Subsequent searches:

  * Data is retrieved directly from MongoDB without additional external API calls.

## Details Screen

* Triggered by pressing a destination card.
* The selected item is passed via route parameters:

```js
const { item } = route.params;
```

* Opens an animated modal with full destination details.
* Users can add the destination to Favorites.

---

# 🗄 Backend & Data Source

* Custom Express.js backend
* MongoDB Atlas (primary database)
* Cloudinary (image storage)
* Axios for API requests to:

  * Pixabay API
  * Wikipedia API
  * Geo API

---

# 🔄 Data Handling & CRUD

### Pull-to-Refresh (Implemented Across Multiple Screens)

Pull-to-Refresh is implemented across all major dynamic list-based screens, including:

* Home (Popular Destinations & Search Results)
* Favorites
* My Trips
* Any screen that displays server-driven collections

Each refresh action:

* Triggers a new GET request to the backend
* Displays a loading indicator
* Properly resets and synchronizes state
* Handles network and error states gracefully
* Ensures real-time data consistency

This guarantees that users always have access to the latest server-side data and reflects a production-ready data synchronization pattern.

## Read (GET)

Fetches all dynamic data used in the application.

## Create (POST)

Allows users to create and publish new trips.

## Update (PUT)

Used for editing:

* User trips
* User profile information

## Delete (DELETE)

Allows users to remove their own trips.

The UI updates automatically after every successful operation.

---

# 📝 Forms & Validation

## Forms Used

* Login Form
* Register Form
* Create Trip Form
* Edit Profile Form

## Validation

Validation logic is separated into:

* Authorization validation module
* Trip validation module

All forms use multiple validation rules per field.

### Example Validation Rules

**Email:**

* Required
* Minimum 10 characters
* Must be a valid email format

**Password:**

* Required
* Minimum 4 characters
* At least one uppercase letter
* At least one digit

**Confirm Password:**

* Required
* Must match password

Validation is implemented both on the frontend and backend to ensure data integrity.

## UX & Keyboard Handling

All forms are properly configured to prevent the keyboard from covering active input fields.

The application uses:

* `KeyboardAvoidingView` where appropriate
* Carefully configured `ScrollView` with proper behavior settings
* Safe Area integration
* Configured StatusBar

This ensures a smooth and professional user experience across all authentication and data entry screens.

The keyboard never overlaps input fields, regardless of device size or orientation.

---

# 📲 Native Device Features

## 📷 Camera & Image Picker

* Select image from gallery
* Capture a new photo
* Upload to Cloudinary
* Used when creating a new trip

## 📍 Location Services

* Retrieve current device location (with permission)
* Manual address input
* Automatic coordinate calculation from address
* Location data attached to trip cards

## 🔐 Security Feature

* Backend stores the last 5 login sessions
* Displays the last active session timestamp in the Profile screen

---

# 🔄 Typical User Flow

1. The user opens the application.
2. Navigates through authentication screens.
3. Enters the Home screen with popular destinations.
4. Searches for destinations or creates a new trip.
5. Views detailed information via animated modals.
6. Adds destinations to Favorites.
7. Manages profile settings and theme preferences.

---

# ⚠️ Error & Edge Case Handling

## Authentication Errors

* Clear validation messages displayed immediately.

## Network & Server Errors

* ActivityIndicator shown during loading.
* Animated modal displayed for server errors.
* User-friendly error messaging.

## Empty Data States

* Informative empty state UI.
* Graceful fallback handling for missing data.

User experience (UX) is prioritized — users are always informed clearly and promptly about system status.

---

# 🌗 Additional Features

* Light & Dark Theme
* Adjustable brightness slider in Dark Mode
* Animated modals
* Server-side caching
* Dynamic API integrations

---

# ✅ Application Status

TravelFever is a fully functional mobile application featuring:

* Authentication & Session Persistence
* Nested Navigation
* Full CRUD Operations
* Real Backend Deployment
* External API Integration
* Native Device Features

---

© 2026 TravelFever
