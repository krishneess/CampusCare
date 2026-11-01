# CampusCare — Development Log 02

## 1. Objective

The objective of this stage was to introduce navigation and authentication page interfaces to CampusCare while preserving the existing homepage and dark/light theme system.

## 2. Technologies Used

- **React.js** — building the user interface
- **React Router DOM** — navigation between pages
- **Lucide React** — interface icons
- **Bootstrap 5** — responsive layout and styling
- **CSS** — custom styling for authentication pages
- **React Hooks** — managing component state and theme preferences
- **Vite** — frontend development server

## 3. Project Structure

The following files were created or modified during this stage:

```text
CampusCare/
├── client/
│   └── src/
│       ├── pages/
│       │   ├── Login.jsx
│       │   └── Register.jsx
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
├── server/
│   └── server.js
├── README1.md
└── README_2.md
```

## 4. Dependencies

The following command was executed inside the `client` directory:

```bash
npm install react-router-dom lucide-react
```

Installation completed successfully, with zero reported vulnerabilities during the audit.

- `react-router-dom` enables client-side navigation.
- `lucide-react` provides icons for the interface.

## 5. React Router Implementation

The existing homepage was preserved and organized into a separate `Home` component. React Router was introduced to display different components based on the current URL.

The application supports these routes:

| Route | Component | Purpose |
|---|---|---|
| `/` | `Home` | Displays the CampusCare homepage |
| `/login` | `Login` | Displays the login interface |
| `/register` | `Register` | Displays the registration interface |

`BrowserRouter`, `Routes`, `Route`, and `Link` were imported from React Router DOM.

Navigation links were updated to open the appropriate routes without performing a full page reload.

## 6. Login Page

The file `client/src/pages/Login.jsx` was created and implemented with the following features:

- Email input field
- Password input field
- Password visibility toggle
- Required-field validation
- Basic email-format validation
- Error messages for invalid input
- Navigation to the registration page
- Link to return to the homepage
- CampusCare branding and icons

The login interface uses React state to manage form values, password visibility, and validation errors.

**Current limitation:** The form does not yet verify credentials against the backend. After successful client-side validation, it redirects to the homepage as a temporary demonstration.

## 7. Registration Page

The file `client/src/pages/Register.jsx` was created.

A temporary registration component was added to resolve a module export error and allow the application to render correctly.

It currently includes:

- A registration-page heading
- A link to the login page
- A link to return to the homepage

**Current limitation:** The registration form, account creation logic, and database integration have not been implemented yet.

## 8. Styling and Theme Support

The authentication page styling was added to `client/src/App.css`.

The styles include:

- Authentication header and branding
- Centered login card
- Input fields and icons
- Password visibility button
- Validation error messages
- Primary action button
- Navigation links
- Responsive styling for smaller screens

The existing CSS variables from `client/src/index.css` are reused to maintain consistency with the CampusCare design and dark/light theme system.

The theme state remains in the main `App` component and is saved using `localStorage`.

## 9. Testing and Troubleshooting

The frontend was started using:

```bash
npm run dev
```

The following issue occurred during implementation:

**Error:** The requested `Register.jsx` module did not provide a default export.

**Cause:** The registration file was empty but was imported into `App.jsx`.

**Resolution:** A temporary React component with a default export was added to `Register.jsx`.

After this correction, the CampusCare homepage rendered successfully again.

The login route and basic form validation were implemented, but real authentication has not yet been tested because the backend integration is pending.

## 10. Current Status

### Completed

- Installed React Router DOM and Lucide React.
- Created the Login and Registration page files.
- Added routing for the homepage, login, and registration pages.
- Preserved the existing homepage and theme functionality.
- Implemented the login interface and basic client-side validation.
- Added authentication page styling.
- Resolved the missing default export error.

### Pending

1. Build the complete registration form.
2. Configure a MongoDB Atlas database.
3. Connect Express to MongoDB using Mongoose.
4. Create user registration and login APIs.
5. Hash passwords using bcrypt.
6. Implement token-based authentication.
7. Add role-based authorization for Student, Staff, and Admin.
8. Redirect authenticated users to their appropriate dashboards.

## 11. Running the Application

### Frontend

Open a terminal in the `client` directory:

```bash
npm run dev
```

Frontend URL: `http://localhost:5173/`

### Backend

Open a separate terminal in the `server` directory:

```bash
npm run dev
```

The backend currently provides the basic Express API endpoint. Authentication endpoints have not been added yet.

## 12. Conclusion

Stage 2 introduced the authentication page structure and client-side navigation for CampusCare. The existing homepage and theme system were preserved, and the login interface now supports basic input validation.

The application is not yet connected to a user database, so account creation and real login functionality remain part of the next development stage.
