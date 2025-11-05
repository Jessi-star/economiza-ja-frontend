import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Promotions from "./pages/Promotions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Supermarkets from "./pages/Supermarkets";


function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div style={{ padding: "40px" }}>
          <Routes>
            <Route path="/" element={<Promotions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/promocoes" element={<PrivateRoute><Promotions /></PrivateRoute>} />
            <Route path="/supermarkets" element={<PrivateRoute><Supermarkets /></PrivateRoute>}/>
            </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
