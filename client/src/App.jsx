import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskManager from "./components/TaskManager";
import { getToken } from "./utils/auth";

function App() {
  const [view, setView] = useState("login");
  const [username, setUsername] = useState("");

  const isLoggedIn = !!getToken();

  if (!isLoggedIn) {
    if (view === "login") {
      return (
        <Login
          onLogin={(uname) => {
            setUsername(uname);
            setView("tasks");
          }}
          onSwitch={() => setView("register")}
        />
      );
    } else {
      return <Register onSwitch={() => setView("login")} />;
    }
  }

  return (
    <TaskManager
      onLogout={() => {
        setUsername("");
        setView("login");
      }}
      username={username}
    />
  );
}

export default App;
