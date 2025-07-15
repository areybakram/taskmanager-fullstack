const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskAPI");
const authRoutes = require("./routes/authAPI");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
