import { BrowserRouter, Route, Routes } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./shared/AuthContext";
import Error404 from "./pages/Error404";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRouted from "./shared/ProtectedRouted";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Error404 />} />

          <Route element={<ProtectedRouted />}>
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/add-task" element={<TaskFormPage />} />
            <Route path="/tasks/:id" element={<TaskFormPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
