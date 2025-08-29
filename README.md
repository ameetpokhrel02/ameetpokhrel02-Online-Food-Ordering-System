# BiteBazaar E-commerce React App

A modern, responsive e-commerce web application inspired by the [Yummy template](https://themewagon.github.io/yummy-red/). Built with React, TypeScript, Material-UI, and Formik/Yup for robust UI, validation, and state management. Features a beautiful landing page, product catalog, gallery, authentication, shopping cart, and more.
image.png
# HomePage




## Features

- **Modern UI**: Inspired by the Yummy template, with custom Material-UI theming and animations.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **Authentication**: Login and signup forms with validation (Formik + Yup).
- **Product Catalog**: Browse, search, and filter products. Add to cart with animated feedback.
- **Gallery**: View top menu items and a full gallery of dishes.
- **Shopping Cart**: Persistent cart with add/remove/clear and checkout UI.
- **Contact Page**: Contact form with validation and styled map placeholder.
- **About Page**: Animated about section and team showcase.
- **Global Search**: Search bar in the header filters products and gallery items.
- **Reusable Components**: ProductCard, GalleryMenuItem, layout components, and more.

## Tech Stack

- **React** (with TypeScript)
- **Material-UI (MUI)** for UI components and theming
- **Formik & Yup** for forms and validation
- **React Router** for navigation
- **Context API** for cart state management

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

3. **Build for production:**
   ```bash
   npm run build
   ```


## Project Structure

```
reactapp/
├── accounts/                # Django app: user model, authentication, API views
│   ├── models.py            # CustomUser, Product, Blog models
│   ├── serializers.py       # DRF serializers for Product, Blog, User
│   ├── views.py             # Product/Blog APIs, Signup & Login APIs
│   └── ...
├── core/                    # Django project settings, URLs
├── db.sqlite3               # SQLite database
├── manage.py                # Django management script
├── public/                  # React static assets (favicon, manifest, images)
├── src/                     # React frontend source code
│   ├── assets/              # App images and media
│   ├── components/          # UI components (auth, layout, etc.)
│   ├── context/             # CartContext for global cart state
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Main pages: Home, About, Products, Gallery, Contact
│   ├── store/               # Redux slices for auth, cart, UI
│   ├── theme.ts             # Custom Material-UI theme
│   ├── types/               # TypeScript types
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Main app and routing
│   └── index.tsx            # App entry point
├── package.json             # React project metadata and dependencies
├── tsconfig.json            # TypeScript configuration
├── venv/                    # Python virtual environment
└── README.md                # Project documentation
```

## Backend (Django REST API)

- **CustomUser**: Extends Django's AbstractUser with roles (customer/admin).
- **Product & Blog**: Models and API endpoints for products and blog posts.
- **Authentication**: JWT-based login and signup endpoints using DRF and SimpleJWT.

### Key API Endpoints

- `POST /api/signup/` — Register a new user (username, email, password, role)
- `POST /api/login/` — Obtain JWT access/refresh tokens (username, password)
- `GET /api/products/` — List products
- `GET /api/blogs/` — List blog posts

> **Note:** Install backend dependencies with `pip install djangorestframework djangorestframework-simplejwt`.

## Getting Started

### Backend (Django)

1. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # On Windows
   # or
   source venv/bin/activate  # On Mac/Linux
   ```
2. **Install dependencies:**
   ```bash
   pip install django djangorestframework djangorestframework-simplejwt
   ```
3. **Apply migrations:**
   ```bash
   python manage.py migrate
   ```
4. **Run the backend server:**
   ```bash
   python manage.py runserver
   ```

### Frontend (React)

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

3. **Build for production:**
   ```bash
   npm run build
   ```

## Usage
...existing code...

## Usage
- **Browse Products:** Use the Products or Home page to view and filter products. Add items to your cart.
- **Gallery:** Explore featured and all menu items in the Gallery.
- **Authentication:** Register or log in via the Signup/Login pages.
- **Cart:** Access your cart from the header. Add, remove, or clear items.
- **Contact:** Use the contact form to send a message (simulated).

## Customization
- Update images in `src/assets/` or `public/` for your own dishes/products.
- Edit theme colors in `src/theme.ts`.
- Add more products or gallery items in the respective page/component files.

## License
This project is for educational/demo purposes. For commercial use, customize as needed.
