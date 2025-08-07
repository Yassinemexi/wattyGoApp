# ⚡ WattyGo

- **WattyGo** is a React Native mobile application (built with Expo) focused on electric vehicle charging — front-end only.  
- It uses local JSON files as the data source for users and charging stations (no backend/API yet). Tested via **Expo Go** and Android emulator.

---

## 🚀 Description

- This is a prototype / frontend implementation of an EV charging app.  
- Users can register/login (with client-side validation), recover passwords, and view charging station data.  
- Offline detection and custom alert popups with icons improve the UX. All data currently lives in static JSON files; no remote server is required.

---

## 📌 Features

- **Authentication (local)**  
  - Register and login screens  
  - “Remember me” persisted with `AsyncStorage`  
  - Password visibility toggles  
  - Password reset flow (verification code simulation)

- **Charging Station Data**  
  - Stations and user data loaded from local JSON files  
  - No external API/back-end yet

- **Offline Detection**  
  - Global popup alert when internet connectivity is lost

- **Reusable Custom Alerts**  
  - Icon-based alerts supporting `MaterialCommunityIcons`, `AntDesign`, `Ionicons`  
  - Configurable title, message, button text, and icon

- **Responsive UI**  
  - Fixed bottom action bars (login/register) with scrollable content  
  - Designed to degrade gracefully on small screens

---

## 🛠 Tech Stack

- **React Native** (via Expo)
- **TypeScript** (optional, adjust if JS)
- **Expo Go** (for quick testing on device)
- **Android Emulator**
- **React Navigation** (stack-based)
- **@expo/vector-icons** (`MaterialCommunityIcons`, `Ionicons`, `AntDesign`)
- **AsyncStorage** (to persist "remember me" credentials)

---

## 📦 Installation & Setup

1. Clone repository
      ```
            git clone https://github.com/hendhamdi/Frontend_WattyGo_Mobile_App.git
            cd wattygo
      ```
2. Install dependencies
      ```
                npm install
                # or
                yarn install
      ```
3. Start Expo
      ```
                npx expo start
      ```
4. Run & Test
- Open Expo Go on your physical device and scan the QR code.
- Or launch an Android emulator and press a in the terminal to open the app there.

---


## 🧠 Notes
- No real backend exists; all logic (auth, verification) is handled client-side and is not secure for production.
- You can later replace JSON loading with real API calls and secure authentication.


---


## 🛠 Future Improvements
- Hook up real backend (e.g., Firebase, REST API)
- Email delivery for password reset
- Real-time station availability (WebSockets or polling)