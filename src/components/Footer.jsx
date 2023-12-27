import { Typography, Link, Container } from "@mui/material";

const Footer = () => { // Componente para el pie de página
  return (
    <footer style={{ padding: "20px", marginTop: "20px" }}>
      <Container>
        <Typography variant="body2" color="#1976d2" align="center">
          © {new Date().getFullYear()} Franco Galván
        </Typography>
        <Typography variant="body2" color="#1976d2" align="center">
          <Link underline="hover" color="#1976d2" href="https://www.linkedin.com/in/francojg13/" target="_blank"> Seguime en LinkedIn
          </Link>{" "}
          |{" "}
          <Link underline="hover" color="#1976d2" href="#" target="_blank"> Política de Privacidad
          </Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
