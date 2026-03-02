# 🛍️ Storely – Full Stack E-Commerce Application

🔗 **Live Demo:** https://storely-maye.onrender.com

Storely is a MERN-stack e-commerce web application built with:

**Frontend:** React (Vite), Zustand, Tailwind CSS  
**Backend:** Node.js, Express  
**Database:** MongoDB  
**Authentication:** JWT (Access + Refresh Tokens), Google OAuth  
**Payments:** Stripe Checkout  
**Caching:** Upstash Redis  
**Image Storage:** Cloudinary

---

## 🚀 Features

### 🔐 Authentication

- Email & Password Login / Signup
- Google OAuth Login
- JWT Access Token (15 minutes)
- Refresh Token (stored in Redis)
- Secure HTTP-only cookies
- Protected routes (User & Admin)

### 🛒 Shopping

- Browse categories
- Featured products carousel
- Add to cart
- Update cart quantity
- Remove items
- Persistent cart per user

### 💳 Payments

- Stripe Checkout integration
- Secure checkout session creation
- Order creation after successful payment
- Purchase success & cancel pages

### 🛠 Admin Dashboard

- Create product
- Delete product
- Toggle featured products
- View analytics

---

## 🏗 Project Structure

```bash

📦 Storely
├─ .gitignore
├─ README.md
├─ backend
│  ├─ controllers
│  │  ├─ analytics.controller.js
│  │  ├─ auth.controller.js
│  │  ├─ cart.controller.js
│  │  ├─ payment.controller.js
│  │  └─ product.controller.js
│  ├─ lib
│  │  ├─ cloudinary.js
│  │  ├─ db.js
│  │  ├─ redis.js
│  │  └─ stripe.js
│  ├─ middlewares
│  │  └─ auth.middleware.js
│  ├─ models
│  │  ├─ order.model.js
│  │  ├─ product.model.js
│  │  └─ user.model.js
│  ├─ routes
│  │  ├─ analytics.routes.js
│  │  ├─ auth.route.js
│  │  ├─ cart.route.js
│  │  ├─ payment.route.js
│  │  └─ product.route.js
│  └─ server.js
├─ frontend
│  ├─ .gitignore
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ bags.jpg
│  │  ├─ glasses.jpg
│  │  ├─ jackets.jpg
│  │  ├─ jeans.jpg
│  │  ├─ shoes.jpg
│  │  ├─ storely-favicon.png
│  │  ├─ suits.jpg
│  │  └─ tshirts.jpg
│  ├─ src
│  │  ├─ App.jsx
│  │  ├─ components
│  │  │  ├─ AnalyticsTab.jsx
│  │  │  ├─ CartItem.jsx
│  │  │  ├─ CategoryItem.jsx
│  │  │  ├─ CreateProductForm.jsx
│  │  │  ├─ FeaturedProducts.jsx
│  │  │  ├─ LoadingSpinner.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  ├─ OrderSummary.jsx
│  │  │  ├─ PeopleAlsoBought.jsx
│  │  │  ├─ ProductCard.jsx
│  │  │  └─ ProductsList.jsx
│  │  ├─ index.css
│  │  ├─ lib
│  │  │  └─ axios.js
│  │  ├─ main.jsx
│  │  ├─ pages
│  │  │  ├─ AdminPage.jsx
│  │  │  ├─ CartPage.jsx
│  │  │  ├─ CategoryPage.jsx
│  │  │  ├─ HomePage.jsx
│  │  │  ├─ LoginPage.jsx
│  │  │  ├─ PurchaseCancelPage.jsx
│  │  │  ├─ PurchaseSuccessPage.jsx
│  │  │  └─ SignUpPage.jsx
│  │  └─ stores
│  │     ├─ useCartStore.js
│  │     ├─ useProductStore.js
│  │     └─ useUserStore.js
│  └─ vite.config.js
├─ package-lock.json
└─ package.json

```

---

## ⚙️ Backend Setup

### 1️⃣ Install dependencies

```bash
cd backend
npm install
```

### 2️⃣ Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

REDIS_URL=your_upstash_redis_url

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key

GOOGLE_CLIENT_ID=your_google_client_id

CLIENT_URL=http://localhost:5173

NODE_ENV=development
```

### 3️⃣ Run backend

```bash
npm run dev
```

---

## 🎨 Frontend Setup

### 1️⃣ Install dependencies

```bash
cd frontend
npm install
```

### 2️⃣ Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 3️⃣ Run frontend

```bash
npm run dev
```

---

## 🔑 Authentication Architecture

- Access Token → 15 minutes (HTTP-only cookie)
- Refresh Token → 7 days (stored in Redis)
- Automatic token refresh using Axios interceptor
- Secure cookie handling
- Role-based admin access

---

## 💳 Stripe Payment Flow

1. User clicks checkout
2. Backend creates Stripe session
3. Stripe redirects to hosted checkout
4. On success → backend verifies session
5. Order is created in MongoDB
6. Cart is cleared

---

## 🧠 Technologies Used

- React + Vite
- Zustand (State Management)
- Tailwind CSS
- Node.js + Express
- MongoDB + Mongoose
- Redis (Upstash)
- Stripe
- Google Identity Services
- Cloudinary

---

## 👨‍💻 Author

**Sayanth Krishna**  
Full Stack Developer  
Calicut, India
