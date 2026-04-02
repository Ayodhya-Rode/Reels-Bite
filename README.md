# Reels Bite 🍴🎥

## 📖 Project Description
Reels Bite is a modern fullstack application (React + Node.js/Express + MongoDB) designed to combine **food discovery with social interaction** through short-form video content.

Inspired by Instagram Reels, the platform focuses exclusively on **food-based short videos** showcasing dishes, recipes, and restaurant highlights.

Each reel represents a **real dish created by a food partner**, allowing users to discover food visually and connect directly with creators.

---

## 🎯 What Makes Reels Bite Unique
- Each reel is tied to a **real dish**, not random content  
- Combines **social engagement with real-world utility**  
- Enables food partners to **visually promote their dishes**  
- Built with a clear **role-based interaction system**  

---

## 👥 Target Users
- **Food Lovers**
  - Discover trending dishes  
  - Save favorites  
  - (Future) Order directly  

- **Restaurants & Chefs**
  - Upload reels to promote dishes  
  - Build an online presence  

- **General Users**
  - Consume engaging food content  
  - Interact via likes and saves  

---

## 🎯 Core Concept
- Each reel = **real dish**  
- Strict role separation:
  - Users → interact  
  - Food Partners → create  
- Media handled externally for **better scalability**  

---

## 👥 User Roles & Permissions

### 👤 Users
- View food reels  
- Like / Unlike reels (toggle system)  
- Save / Unsave reels (toggle system)  
- View food partner profiles  

### 🍳 Food Partners
- Upload food reels  
- Upload profile picture  
- Manage their content  
- ❌ Cannot like or save reels (prevents fake engagement)  

---

## 🚀 Features Implemented

### 🔐 Authentication & Authorization
- User & Food Partner registration  
- Login with validation  
- Role-based access control  
- Auto-login after registration  

---

### 🛡️ Security
- Password hashing using `bcrypt`  
- JWT-based authentication (stored in HTTP-only cookies)  
- Protected routes  

---

### 🎥 Reels System
- Food partners upload reels  
- Reels are displayed in a scrollable feed  
- Each reel is linked to a specific dish  

---

### ❤️ Engagement System

Users can:
- Like / Unlike reels  
- Save / Unsave reels  

#### ⚙️ Toggle Logic
- A user can like a reel only once  
- Clicking again removes the like  
- Same behavior applies to saved reels  

👉 Ensures data consistency and prevents duplicate actions  

---

### 🖼️ Media Handling (Optimized Storage)

Media is managed using **ImageKit** instead of storing files directly in the database.

#### Flow:
1. Food partner uploads video/image  
2. File is stored on ImageKit  
3. ImageKit returns a URL  
4. URL is stored in MongoDB  
5. Frontend uses the URL to render media  

👉 Only URLs are stored in DB  
👉 Improves performance, scalability, and storage efficiency  

---

### 👤 Profile System
- Users can view food partner profiles  

Profiles include:
- Uploaded reels  
- Profile image  

---

## ⚙️ Tech Stack

### Frontend
- React  
- Axios  
- React Hook Form  
- React Router DOM  
- React Toastify  
- HTML, CSS  

### Backend
- Node.js  
- Express  
- MongoDB (Mongoose)  
- Multer  
- ImageKit  
- Morgan  
- CORS  
- Cookie Parser  

### Database
- MongoDB Atlas  

### Authentication & Security
- JWT (HTTP-only cookies)  
- Bcrypt  

### Media Storage
- ImageKit  

---

## 🧠 Key Engineering Decisions
- External media storage (ImageKit) instead of DB  
- Role-based restrictions to prevent fake engagement  
- Toggle-based like/save system for consistent state management  

---

## 📡 API Endpoints

### 🔐 User Authentication

| Method | Endpoint | Access | Description |
|--------|----------|--------|------------|
| POST | `/api/auth/user/register` | Public | Register a new user |
| POST | `/api/auth/user/login` | Public | Login user and issue JWT |
| POST | `/api/auth/user/logout` | User | Logout user and clear cookie |

---

### 🍳 Food Partner Authentication

| Method | Endpoint | Access | Description |
|--------|----------|--------|------------|
| POST | `/api/auth/food-partner/register` | Public | Register food partner (with avatar upload) |
| POST | `/api/auth/food-partner/login` | Public | Login food partner |
| POST | `/api/auth/food-partner/logout` | Food Partner | Logout food partner |
| GET | `/api/auth/food-partner/:id` | Public | Get food partner profile |
| GET | `/api/auth/me` | Food Partner | Get current food partner details |

---

### 🎥 Food / Reels Routes

| Method | Endpoint | Access | Description |
|--------|----------|--------|------------|
| POST | `/api/food/create-food` | Food Partner | Upload food reel |
| GET | `/api/food/` | Public | Get all reels (feed) |

---

### ❤️ Like System

| Method | Endpoint | Access | Description |
|--------|----------|--------|------------|
| POST | `/api/food/like` | User | Toggle like/unlike reel |

---

### 📌 Save System

| Method | Endpoint | Access | Description |
|--------|----------|--------|------------|
| POST | `/api/food/save` | User | Toggle save/unsave reel |

---

## ⚙️ API Logic Highlights

### 🔁 Like / Save Toggle Logic
- A user can perform like/save only once per reel  
- Repeating the action removes the previous state  

---

### 🖼️ Media Upload Flow
- Multer (memory storage) handles file upload  
- Files are sent to ImageKit  
- URL is stored in MongoDB  
- Frontend renders using URL  

---