#  TaskManager Fullstack App

A modern full-stack task manager application built with **React**, **Node.js**, **Express**, and **MySQL**. Users can create, update, delete tasks, and filter completed, incomplete and All tasks with styled UI.

---

##  Features

- Authentication
- Register new users
- Add new tasks
- Tasks creation date and due dates.
- Filter tasks as completed, incomplete and All tasks
- Edit or delete tasks
- Styled modern UI
- REST API backend

---

##  Tech Stack
                    
 Frontend:      React (Vite template)     
 Backend:       Node.js + Express.js      
 Database:      MySQL                     
 HTTP Client:   Axios                     
 Styling:       CSS (custom)              

---

##  Prerequisites

- Node.js (v18+ recommended)
- npm (comes with Node)
- MySQL
- Git

---

##  Setup Instructions

###  1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/taskmanager-fullstack.git
cd taskmanager-fullstack
```

---

###  2. Setup the Backend

```bash
cd server
npm install
```

####  Configure Environment Variables

Create a `.env` file inside the `server/` folder or in root:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=task_hub
PORT=3306
```

####  Setup the Database

## 🛠️ Database Setup

To set up the MySQL database for this project:

1. Open your MySQL terminal or any SQL client (like phpMyAdmin, MySQL Workbench).
2. Run the following SQL commands to create the required schema and tables:

```sql
CREATE DATABASE task_hub;
USE task_hub;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE todo_tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deadline DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


You can add dummy data or start fresh from the app UI.

#### Start Backend Server

```bash
node server.js
```

The API will run at: `http://localhost:8080/api/tasks`

---

###  3. Setup the Frontend

```bash
cd ../client
npm install
npm run dev
```

This starts the React app at: `http://localhost:5173`

---

##  Author

Made by Mohammad Areeb Akram

---

##  License

This project is licensed under [MIT](LICENSE).