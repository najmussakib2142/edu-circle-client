
🎓 EduCircle - Assignment Management Web App

EduCircle is a full-stack educational assignment management platform that allows users to create, manage, and submit assignments. It includes user authentication, role-based access, form validations, and JWT-protected routes.

---

## 📅 Live Site:

https://edu-circle-admin.web.app/

## 🚀 Tech Stack

* **Frontend**: React, Tailwind CSS, DaisyUI, React Router, Axios, Framer Motion
* **Backend**: Express.js, MongoDB, Mongoose, dotenv, CORS, JSON Web Token (JWT)
* **Authentication**: Firebase Auth (Email/Password + Google login)

---


### Pages & Features

* **Navbar**: Conditional login/logout, profile dropdown, navigation links.
* **Authentication**: Register, Login, Google login, JWT token generation and storage.
* **Home Page**: Banner, Features, FAQ with animation using Framer Motion.
* **Assignments Page (Public)**: View all assignments. Includes search and filter (difficulty).
* **Create Assignment (Private)**: Add new assignments with validation and datepicker.
* **Update Assignment (Private)**: Editable prefilled form for assignment creators.
* **Assignment Details (Private)**: Shows detailed info and allows submission.
* **Submit Assignment Modal**: Google Docs link, note, and form validation.
* **My Submissions (Private)**: View only current user’s attempted submissions.
* **Pending Submissions (Private)**: List of all pending (not marked) assignments.
* **Give Mark (Modal/Page)**: Allows other users to mark assignments (not their own).
* **Error Page**: Animated 404 page with themed design.
* **Theme Switcher**: Light/Dark mode toggle.

---

### Features

* **RESTful API** for assignments and submissions
* **MongoDB Atlas** as database
* **CORS Enabled**
* **JWT Middleware** for protecting private endpoints
* **Assignment Routes**: create, read, update, delete
* **Submission Routes**: submit, get by user, get pending, update (mark)


## 🚩 Important Functionalities

* Only creators can delete or update their assignments.
* Users cannot evaluate their own submissions.
* JWT stored and verified for all protected routes.
* Form validations implemented on both client and server.
* Clean and user-friendly UI with mobile responsiveness.

---

## ✍️ Contribution & Feedback

Feel free to fork, star, and contribute to the project! Feedback and suggestions are always welcome.

---

## 🌟 Developed By:

Najmus Sakib




This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
