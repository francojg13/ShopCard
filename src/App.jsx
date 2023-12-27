// Importación de bibliotecas y material UI
import { useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

const productsData = [ // Datos de los productos
  { id: 1, name: "Notebook Dell Inspirion", price: 450000, image: "/src/assets/Notebook Dell.png" },
  { id: 2, name: "Mochila Dell", price: 150000, image: "/src/assets/Mochila Dell.png" },
  { id: 3, name: "Mouse Logitech MX 3 Master", price: 190000, image: "/src/assets/MX Master 3.png" },
  { id: 4, name: "Teclado inalámbrico MX Mini", price: 120000, image: "/src/assets/Teclado MX Mini.png" },
  { id: 5, name: "Impresora Epson L805", price: 410000, image: "/src/assets/Impresora Epson.png" },
  { id: 6, name: "Micro Procesador Intel 5", price: 333000, image: "/src/assets/Intel i5.png" },
  { id: 7, name: "Disco duro externo Seagate", price: 80000, image: "/src/assets/Disco duro externo Seagate.png" },
  { id: 8, name: "Micro Procesador Ryzen 5", price: 350000, image: "/src/assets/Ryzen 5.png" }
];

const App = () => { //Estado para el carrito y snackbar
  const [cart, setCart] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddToCart = (product) => { // Función para agregar productos al carrito
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    setSnackbarOpen(true); // Mostrar Snackbar
  };

  const handleAdjustQuantity = (item, action) => { // Función para ajustar la cantidad de productos en el carrito
    if (action === "increase") {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else if (action === "decrease") {
      setCart(
        cart
          .map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0)
      );
    }
  };

  const handleSelectPaymentMethod = (method) => { // Función para seleccionar el método de pago
    setPaymentMethod(method);
  };

  const handleCheckout = () => { // Función para realizar el pago y mostrar alerta
  };

  const handleDeleteAll = () => { // Función para borrar todos los productos del carrito
    setCart([]);
  };
  const toggleCart = () => { // Función para alternar la visibilidad del carrito
    setCartOpen(!isCartOpen);
  };

  return ( //Renderización del componente principal
    <div>
      {/* Snackbar para mostrar mensaje de producto agregado */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={500}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="soft"
          color="neutral"
          onClose={() => setSnackbarOpen(false)}
          severity="success"
        >
          Producto agregado al carrito
        </MuiAlert>
      </Snackbar>
      <Container style={{ marginTop: "20px" }}>
        <Typography variant="h4">
          Lista de Productos
        </Typography>
        <Grid container spacing={0}>
          {productsData.map((product) => (
            <Grid item xs={3} key={product.id}>
              <ProductList products={[product]} onAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Cart
        cart={cart}
        onAdjustQuantity={handleAdjustQuantity}
        onCheckout={handleCheckout}
        onDeleteAll={handleDeleteAll}
        isCartOpen={isCartOpen}
        toggleCart={toggleCart}
        handleSelectPaymentMethod={handleSelectPaymentMethod}
      />
      <Footer />
    </div>
  );
};

export default App;
