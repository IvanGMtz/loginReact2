import { BrowserRouter, Route, Routes } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./shared/AuthContext";
import Error404 from "./pages/Error404";
import HomePage from "./pages/HomePage";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tasks" element={<h1>Task Page</h1>} />
          <Route path="/add-task" element={<h1>new task</h1>} />
          <Route path="/tasks/:id" element={<h1>update task</h1>} />
          <Route path="/profile" element={<h1>profile</h1>} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
