# 🎨 Creative Arena

**Creative Arena** is a full-stack contest management platform where creativity meets opportunity.  
Users can participate in creative contests, creators can host competitions, and admins manage the entire ecosystem — all through a secure, role-based system.

🔗 **Live Demo:**   
📦 **Server Repo:** https://github.com/wali999/creative-arena-server  
📦 **Client Repo:** https://github.com/wali999/creative-arena-client 

---

## 🚀 Features Overview

### 🏠 Home Page
- Responsive **Navbar** with logo, website name, and navigation links  
- User profile avatar with dropdown (Dashboard, Logout) when logged in  
- **Hero Banner** with contest-type search (backend-powered)  
- **Popular Contests Section** (Top 6, sorted by highest participation)  
- Contest cards with image, description preview, participants count, and details button  
- **Winner Advertisement Section** to motivate users  

---

### 🗂️ All Contests Page
- Displays **admin-approved contests only**
- Tabs to filter contests by type (Design, Writing etc.)

---

### 🔐 Contest Details Page (Private Route)
- Full contest information with large banner image
- Live **deadline countdown** with automatic “Contest Ended” state
- Participant count increases after successful payment
- Secure **payment-based registration**
- Winner name & photo displayed after declaration
- **Submit Task modal** available only to registered users

---

## 📊 Dashboards

### 👤 User Dashboard
- My Participated Contests (sorted by upcoming deadline)
- My Winning Contests
- Profile update page
- Win percentage chart (won vs participated)

### ✍️ Creator Dashboard
- Add Contest 
- My Created Contests (status: Pending / Approved / Rejected)
- Edit & delete pending contests
- View submissions and declare winner

### 🛠️ Admin Dashboard
- Manage Users (role update)
- Manage Contests (confirm, reject, delete)

---

## 🏆 Additional Features
- **Leaderboard** page (ranked by total contest wins)
- Dark / Light theme toggle
- Secure APIs using **JWT authentication**
- Pagination (10 items per page) on Manage Contests page for admin
- SweetAlert2 for success & error notifications
- Fully responsive design (mobile, tablet, desktop)

---

## 🧑‍💻 Tech Stack

### Frontend
- React
- JavaScript (ES6+)
- Tailwind CSS
- DaisyUI
- React Router
- React Hook Form
- React Icons
- Axios
- SweetAlert2
- Firebase Authentication

### Backend
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token)
- Firebase Admin SDK

### Tools & Services
- Stripe (Payment Gateway)
- Imgbb (Image Hosting)
- Vercel / Netlify (Client Deployment)
- Render / Railway (Server Deployment)

---


👨‍💻 Author

Oali Ullah
📧 Email: waliullah.neo@gmail.com
