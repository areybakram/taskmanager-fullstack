

const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskHandler");
const { verifyToken } = require("../middleware/authMiddleware");


router.get("/", verifyToken, controller.getAllTasks);
router.post("/", verifyToken, controller.addTask);
router.put("/:id", verifyToken, controller.updateTask);
router.delete("/:id", verifyToken, controller.removeTask);


router.put("/complete/:id", verifyToken, controller.toggleComplete);

module.exports = router;
