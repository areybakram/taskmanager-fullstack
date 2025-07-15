

const db = require("../config/database");

exports.getAllTasks = (req, res) => {
  db.query(
    "SELECT * FROM todo_tasks WHERE user_id = ?",
    [req.userId],
    (err, rows) => {
      if (err) return res.status(500).send(err);
      res.json(rows);
    }
  );
};

exports.addTask = (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).send("Title required");

  const now = new Date();
  const deadline = new Date(now);
  deadline.setDate(deadline.getDate() + 1); 

  db.query(
    "INSERT INTO todo_tasks (title, user_id, completed, created_at, deadline) VALUES (?, ?, ?, ?, ?)",
    [title, req.userId, false, now, deadline],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({
        id: result.insertId,
        title,
        completed: false,
        created_at: now,
        deadline,
      });
    }
  );
};


exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  db.query(
    "UPDATE todo_tasks SET title = ? WHERE id = ? AND user_id = ?",
    [title, id, req.userId],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
};


exports.removeTask = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM todo_tasks WHERE id = ? AND user_id = ?",
    [id, req.userId],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
};


exports.toggleComplete = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  db.query(
    "UPDATE todo_tasks SET completed = ? WHERE id = ? AND user_id = ?",
    [completed, id, req.userId],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
};
