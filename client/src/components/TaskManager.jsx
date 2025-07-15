
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken, clearToken } from "../utils/auth";
import { FaEdit, FaTrash } from "react-icons/fa";

function TaskManager({ onLogout, username }) {

  const [tasks, setTasks] = useState([]);

  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [editingTitle, setEditingTitle] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {

    const res = await axios.get("http://localhost:8080/api/tasks", {

      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {

    if (!newTitle.trim()) return;
    await axios.post(
      "http://localhost:8080/api/tasks",
      { title: newTitle },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    setNewTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {

    await axios.delete(`http://localhost:8080/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    fetchTasks();
  };

  const startEdit = (id, title) => {
    setEditingId(id);
    setEditingTitle(title);
  };

  const saveEdit = async (id) => {
    if (!editingTitle.trim()) return;
    await axios.put(
      `http://localhost:8080/api/tasks/${id}`,
      { title: editingTitle },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    setEditingId(null);
    setEditingTitle("");
    fetchTasks();
  };

  const toggleTaskCompletion = async (id, completed) => {
    await axios.put(
      `http://localhost:8080/api/tasks/complete/${id}`,
      { completed },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    fetchTasks();
  };

  const logout = () => {
    clearToken();
    onLogout();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <div className="container">

      
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <img src="public/cloud.jpg" alt="Logo" style={{ width: 70, height: 60 }} />
       
      </div>

      <h2 style={{ textAlign: "center", margin: "15px 0" }}>Welcome, {username}</h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter new task"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>All</button>
        <button onClick={() => setFilter("completed")} className={filter === "completed" ? "active" : ""}>Completed</button>
        <button onClick={() => setFilter("incomplete")} className={filter === "incomplete" ? "active" : ""}>Incomplete</button>
      </div>

      <p className="task-note">Helo there, Welcome to your Personalized Tasks List!</p>

      {filteredTasks.length === 0 ? (
        <p>No tasks to show</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => {
            const isOverdue = !task.completed && new Date(task.deadline) < new Date();
            return (
              <li key={task.id} className={`${task.completed ? "completed" : ""} ${isOverdue ? "overdue" : ""}`}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id, !task.completed)}
                />
                <div className="task-info">
                  {editingId === task.id ? (
                    <>
                      <input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="edit-input"
                      />
                      <div className="task-actions">
                        <button className="edit" onClick={() => saveEdit(task.id)}>Save</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span>{task.title}</span>
                      <small>🕒 Created: {new Date(task.created_at).toLocaleString()}</small>
                      
                      <small>⏳ Deadline: {new Date(task.deadline).toLocaleString()}</small>
                    </>
                  )}
                </div>
                {editingId !== task.id && (
                  <div className="task-actions">
                    <button className="edit" onClick={() => startEdit(task.id, task.title)}><FaEdit /></button>

                    <button className="delete" onClick={() => deleteTask(task.id)}><FaTrash /></button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default TaskManager;
