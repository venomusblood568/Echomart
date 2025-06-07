import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./page/login"
import Signup from "./page/signup";
import Dashboard from "./page/dashbaord";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  );
}

export default App;
