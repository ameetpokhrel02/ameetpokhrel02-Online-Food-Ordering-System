# BiteBazaar E-commerce React App

A modern, responsive e-commerce web application inspired by the [Yummy template](https://themewagon.github.io/yummy-red/). Built with React, TypeScript, Material-UI, and Formik/Yup for robust UI, validation, and state management. Features a beautiful landing page, product catalog, gallery, authentication, shopping cart, and more.
image.png
# HomePage
<img width="1840" height="957" alt="image" src="https://github.com/user-attachments/assets/309f0fa9-0b58-4fa5-a762-f96d9534422d" />
# FeaturedProducts
<img width="1838" height="892" alt="image" src="https://github.com/user-attachments/assets/b08b2b49-3b9c-4e92-b13f-20e67c52b7b6" />
# DeliveryPickupLocation
<img width="1842" height="915" alt="image" src="https://github.com/user-attachments/assets/96cc5392-a0de-4b32-8122-c83c82dbb1c1" />
# F&Q
<img width="1801" height="715" alt="image" src="https://github.com/user-attachments/assets/104760c2-fc04-49b3-8202-2da29a6a3974" />
# Footer
<img width="1814" height="930" alt="image" src="https://github.com/user-attachments/assets/e46fccb7-24a8-4c40-a6c9-1523eb39c1d3" />




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

## Folder Structure

```
reactapp/
├── public/                # Static assets (favicon, manifest, images)
├── src/
│   ├── assets/            # App images and media
│   │   ├── components/
│   │   │   ├── auth/          # Auth pages and layouts
│   │   │   ├── layout/        # Header, Footer, SubscribeSection, etc.
│   │   │   └── ...            # Reusable UI components
│   │   ├── context/           # CartContext for global cart state
│   │   ├── pages/             # Main pages: Home, About, Products, Gallery, Contact
│   │   ├── App.tsx            # Main app and routing
│   │   ├── theme.ts           # Custom Material-UI theme
│   │   └── index.tsx          # App entry point
│   ├── package.json           # Project metadata and dependencies
│   ├── tsconfig.json          # TypeScript configuration
│   └── README.md              # Project documentation
```

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
