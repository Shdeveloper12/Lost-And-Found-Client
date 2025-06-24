-------------------------------------------LOST AND FOUND WEBSITE---------------------------------------------

PURPOSE: " To help people report, find, and recover lost and found items efficiently and securely."


-----------------------------------------------FEATURES-------------------------------------------------

1. Report Lost Items:

    * Users can post details (photo, description, time, location) of things they've lost.

    * Helps others identify and possibly return the item.

2. Report Found Items:

    * If someone finds an item (e.g., phone, bag, keys), they can list it with a photo and where it was found.

3. Connect Owners & Finders:

    * Authenticated users can view and manage their posts.

    * Enables messaging or status updates once an item is recovered.

4. Secure Access:

    * Firebase authentication (email/password, Google) is used.

    * JWT ensures private route protection and secure data access.

5. Review System:

    * Users can leave reviews about their experience or gratitude after recovering items.

6. Theme Personalization:

    * Light/dark mode switch for accessibility and preference.
  


---------------------------------------------------TECHNOLOGY STACK----------------------------------------------------


# Frontend
React.js – UI components

React Router – Navigation

Axios – API requests

CSS / Tailwind / Bootstrap – Styling (use your actual choice)

# Backend
Node.js – Runtime environment

Express.js – RESTful API development

MongoDB + Mongoose – Database and data modeling

# Authentication
JWT (JSON Web Tokens) – Login/session handling

bcrypt.js – Password encryption


# frontend/package.json
"axios": "^...",
"react": "^...",
"react-dom": "^...",
"react-router-dom": "^...",


# backend/package.json
"express": "^...",
"mongoose": "^...",
"bcryptjs": "^...",
"jsonwebtoken": "^...",
"cors": "^...",
"dotenv": "^...",
"nodemon": "^..."


# Run Locally
1. https://lost-and-found-server-rho.vercel.app/lostandfounditems

2.https://lost-and-found-server-rho.vercel.app/lostandfounditems/:id 

3. https://lost-and-found-server-rho.vercel.app/recovered


# Project Live Link
https://lostandfounds.netlify.app



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
