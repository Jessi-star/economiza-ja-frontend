import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav style={{
      background: "#139c43",
      padding: "12px 20px",
      color: "white",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <div style={{ fontWeight: 700 }}>EconomizaJá</div>

      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Promoções</Link>

        {!user && (
          <>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
            <Link
              to="/register"
              style={{
                color: "#139c43",
                background: "white",
                padding: "4px 8px",
                borderRadius: 6,
                textDecoration: "none"
              }}
            >
              Cadastre-se
            </Link>
          </>
        )}

        {/* ✅ Agora funciona com displayName ou e-mail */}
        {user && (
          <span>Olá, {(user.displayName || user.email).split(" ")[0]}!</span>
        )}

        {user && (
          <button
            onClick={handleLogout}
            style={{
              background: "#E74C3C",
              color: "white",
              border: "none",
              padding: "4px 10px",
              borderRadius: 6,
              cursor: "pointer"
            }}
          >
            Sair
          </button>
        )}
      </div>
    </nav>
  );
}
