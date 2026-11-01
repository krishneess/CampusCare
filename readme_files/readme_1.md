# CampusCare — Development Log 01

## 1. Project Overview

CampusCare is a college complaint management system that allows students to report campus issues and track their resolution. The planned system includes Student, Staff and Admin roles.

## 2. Technology Stack

- **Frontend:** React.js, Vite, Bootstrap 5, CSS
- **Icons & Navigation:** Lucide React, React Router DOM
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (planned)
- **Tools:** VS Code, PowerShell, Nodemon

## 3. Project Setup

The project was created in:

`E:\web tech\mini project\CampusCare`

### Frontend commands

```powershell
npm create vite@latest client -- --template react
cd client
npm install
npm install bootstrap react-router-dom lucide-react
```

**Purpose:** Created the React application using Vite and installed the libraries for styling, navigation and icons. Oxlint was selected during setup.

### Backend commands

```powershell
cd ..
mkdir server
cd server
npm init -y
npm install express cors dotenv mongoose bcryptjs jsonwebtoken
npm install -D nodemon
```

**Purpose:** Created a separate Node.js backend and installed packages for API development, configuration, database integration and future authentication.

### Backend scripts

```powershell
npm pkg set scripts.start="node server.js"
npm pkg set scripts.dev="nodemon server.js"
npm run
```

The scripts were verified successfully. `npm start` runs Node.js directly, while `npm run dev` uses Nodemon to restart the server when files change.

## 4. Backend Implementation

Created `server/server.js` with the following features:

- Initialized the Express application.
- Enabled CORS and JSON request parsing.
- Configured the server to use port `5000` by default.
- Created a GET `/` endpoint returning a JSON message.
- Started the server using `app.listen()`.

The backend was tested successfully at `http://localhost:5000/`.

**Note:** The API currently contains only a basic test endpoint. Authentication, complaint APIs and database connectivity are pending.

## 5. Frontend Implementation

The following files were edited:

- **`client/src/main.jsx`** — imports Bootstrap CSS, Bootstrap JavaScript, global CSS and the main React component.
- **`client/src/App.jsx`** — implements the homepage, navigation, dashboard preview, complaint categories, workflow steps and footer.
- **`client/src/index.css`** — defines global styles, typography and theme variables.
- **`client/src/App.css`** — contains component styling, button styles, card layouts and responsive CSS.

React's `.map()` method is used to render complaint categories and workflow steps from JavaScript arrays, reducing repeated JSX code.

## 6. Dark/Light Mode

A theme toggle was added to the navbar.

- CSS variables define the colors for both themes.
- React's `useState` manages the selected theme.
- `useEffect` updates the document's `data-theme` attribute.
- Browser `localStorage` saves the preference across page refreshes.
- CSS selectors apply the appropriate colors to the page components.

Both themes were tested locally.

## 7. Current Project Structure

```text
CampusCare/
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
├── server/
│   ├── server.js
│   └── package.json
└── README1.md
```

## 8. Current Status and Next Steps

**Completed**
- React and Express project setup.
- Homepage with responsive styling.
- Dark/light mode with saved preference.
- Basic Express API tested successfully.

**Pending**
1. Login and registration pages.
2. MongoDB Atlas connection.
3. Authentication and role-based authorization.
4. Complaint creation, tracking and CRUD APIs.
5. Student, Staff and Admin dashboards.
6. API testing with Postman and deployment.

## 9. Running the Application

Run each command in its respective directory and keep both terminals open.

**Frontend — `client` directory**

```powershell
npm run dev
```

URL: `http://localhost:5173/`

**Backend — `server` directory**

```powershell
npm run dev
```

URL: `http://localhost:5000/`

## 10. Development Approach

The project is being developed incrementally. First, we established the frontend and backend environments, then implemented and tested the homepage and theme system. Next, we will build authentication, connect the database, implement complaint management and finally add role-specific dashboards, testing and deployment.

This approach allows each module to be tested and understood before integrating it into the complete application.