# SwachhUtsav ♻️
### Smart Festival Waste Management System

SwachhUtsav is a comprehensive React Native application designed to optimize garbage collection and reporting during festive seasons. It bridges the gap between citizens, garbage collectors, and administrators to ensure a cleaner environment.

## 🚀 Features

### 👤 Citizen App
- **Interactive Map**: View nearby garbage bins and reported waste locations.
- **AI-Powered Reporting**: Capture photos of garbage. The built-in AI verifies if it's actually waste before allowing submission.
- **Location Tracking**: Automatically captures GPS coordinates for accurate collection.
- **Status Tracking**: Monitor the progress of your reported complaints (Pending → Assigned → Resolved).

### 🚛 Garbage Collector App
- **Task Dashboard**: View a list of nearby garbage reports.
- **Navigation**: Map-based navigation to the exact waste location.
- **Resolution Proof**: Upload "Before" and "After" photos to mark tasks as resolved.

### 📊 Admin Panel
- **Real-time Monitoring**: Track all complaints across the city.
- **Analytics Dashboard**: Weekly reports and waste composition charts.
- **Resource Management**: Efficiently deploy vehicles to high-waste zones.

## 🛠️ Tech Stack
- **Frontend**: React Native with Expo
- **Navigation**: React Navigation (Stack)
- **Maps**: React Native Maps & Expo Location
- **AI**: Custom Image Classification Logics (Threshold > 70%)
- **Charts**: React Native Chart Kit
- **Backend (Compatible)**: Firebase Authentication, Firestore, and Storage

## 📂 Project Structure
```text
src/
 ├── components/    # Reusable UI elements
 ├── screens/       # Full screen components (Login, Home, AI Camera, Admin)
 ├── navigation/    # Stack navigation configuration
 ├── services/      # AI detection and external API calls
 ├── firebase/      # Firebase initialization & config
 ├── styles/        # Shared styling and themes
 └── utils/         # Helper functions
```

## ⚙️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/swapnilyadv/SwachhUtsav.git
   cd SwachhUtsav
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npx expo start
   ```

4. **Run on your device**:
   Scan the QR code with the **Expo Go** app (Android) or Camera app (iOS).

## 🌍 Sustainability
SwachhUtsav is built with a clean green theme, symbolizing our commitment to sustainability and a cleaner planet. Happy cleaning!

---
Developed with ❤️ by [Swapnil Yadav](https://github.com/swapnilyadv)
