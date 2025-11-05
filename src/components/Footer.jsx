export default function Footer() {
  return (
    <footer
      style={{
        background: "#139c43",
        color: "white",
        textAlign: "center",
        padding: "12px 0",
        marginTop: "40px",
        fontSize: "14px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      © {new Date().getFullYear()} Jéssica Rodrigues LTDA — Todos os direitos reservados.
    </footer>
  );
}
