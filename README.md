# Reels Bite 🍴🎥

## 📖 Project Description
Reels Bite is a modern fullstack application (React frontend + Node.js/Express backend + MongoDB database) designed to bring together food discovery and social interaction. Inspired by Instagram’s reels format, Reels Bite focuses exclusively on short food reels that showcase dishes, recipes, and restaurant highlights.

### 🎯 What makes Reels Bite unique
- It’s not just about watching reels — every reel is tied to a real dish that users can order directly.
- Combines social media engagement (like, share, save) with e‑commerce functionality (place orders).
- Provides a platform for restaurants, chefs, and food creators to showcase their dishes in a visually engaging way.

### 👥 Target Users
- **Food lovers**: Explore trending dishes, save favorites, and order instantly.
- **Restaurants & Chefs**: Upload reels to promote dishes and receive direct orders.
- **General users**: Enjoy entertaining food content while interacting socially (likes, shares, saves).



## 🚀 Features Implemented

### 🔐 Authentication & Session Management
- **User Registration**
  - Validates inputs and password length.
  - Auto-login after registration.
  - Creates a new session with device info.
  - Enforces **max 4 active sessions** per user.

- **User Login**
  - Validates credentials.
  - Issues access & refresh tokens.
  - Creates a new session with IP & User-Agent.
  - Enforces **max 4 active sessions** per user.

- **Logout (Single Device)**
  - Revokes the session associated with the refresh token.
  - Clears refresh token cookie.

- **Logout All Devices**
  - Revokes all active sessions for the user.
  - Clears refresh token cookie.

### 🛡️ Security Highlights
- Password hashing with `bcrypt`.
- Refresh token hashing with `crypto SHA-256`.
- Access token includes `sessionId`.
- HTTP-only cookies for refresh tokens.

---

## 📅 Other Features on the Way
- 🎥 Food reels feed (upload, view, interact)
- ❤️ Like, share, and save reels
- 🛒 Direct food ordering from reels
- 🔄 Refresh token rotation for enhanced security
- 👤 Role-based access control (admin, user, restaurant)
- 📧 Email verification and password reset
- 🔔 Notifications for likes, shares, and orders
- 🗂️ User profile with saved reels and order history

