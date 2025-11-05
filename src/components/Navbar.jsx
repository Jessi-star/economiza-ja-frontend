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
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      
      {/* ✅ LOGO NOVA */}
      <Link to="/" style={{
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "6px"
        }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2838/2838838.png"
            alt="Carrinho"
            style={{ width: 26, height: 26, filter: "invert(100%)" }}
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
            alt="Localização"
            style={{ width: 24, height: 24, filter: "invert(100%)" }}
          />
        </div>

        <h2 style={{
          color: "#fff",
          margin: 0,
          fontWeight: "700",
          fontFamily: "Arial, sans-serif",
          letterSpacing: "1px"
        }}>
          EconomizaJá
        </h2>
      </Link>

      {/* ✅ MENU */}
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Promoções</Link>

        {user && (
          <Link to="/supermarkets" style={{ color: "white", textDecoration: "none" }}>
            Supermercados
          </Link>
        )}

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
