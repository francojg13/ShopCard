import { useState } from "react";
import { Card, CardContent, Button, Typography, Drawer, IconButton, Grid, Box, Radio, RadioGroup, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; //Icono carrito
import DeleteIcon from "@mui/icons-material/Delete"; //Icono borrar

const Cart = ({ cart, onAdjustQuantity, onDeleteAll, isCartOpen, toggleCart
}) => {  // Componente para mostrar y gestionar el carrito de compras
  const [paymentOption, setPaymentOption] = useState("tarjeta");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", dni: "", cardNumber: "",
  });

  const handlePaymentOptionChange = (event) => {
    setPaymentOption(event.target.value);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calculateTotal = () => { // Función para calcular el total del carrito
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleCheckout = () => { // Función abrir el Dialog y realizar el pago
    if (paymentOption === "tarjeta") {
      const isNumeric = /^\d+$/.test(formData.cardNumber);
      const isLengthValid = formData.cardNumber.length === 16;

      if (!isNumeric || !isLengthValid) {
        alert(
          "Por favor, ingrese un número de tarjeta válido (16 dígitos numéricos)."
        );
        return;
      }
      alert(`Pago con tarjeta completado.`);
    } else if (paymentOption === "efectivo") {
      alert(`Pago en efectivo completado.`);
    } else {
      alert("Seleccione un método de pago antes de pagar.");
    }
  };

  return (
    <div>
      <IconButton
        onClick={toggleCart}
        style={{ position: "absolute", top: 20, right: 20, color: "#1976d2" }}
      >
        <ShoppingCartIcon />
      </IconButton>
      <Drawer anchor="right" open={isCartOpen} onClose={toggleCart}>
        <div
          style={{
            width: "300px",
            padding: "20px",
            backgroundColor: "#DDF1FF",
          }}
        >
          <Typography variant="h6">Carrito de Compras</Typography>
          <br />
          {cart.map((item) => (
            <Card
              key={item.id}
              style={{
                marginLeft: "-5px",
                marginRight: "-10px",
                marginBottom: "20px",
                borderRadius: "15px",
              }}
            >
              <Grid container spacing={18}>
                <Grid item xs={2}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      padding: "20px",
                      width: "100px",
                      height: "auto",
                      objectFit: "fill",
                    }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <CardContent>
                    <Typography variant="subtitle2">{item.name}</Typography>
                    <Typography variant="body2" color="#616161">
                      Cantidad: {item.quantity}
                    </Typography>
                    <Button onClick={() => onAdjustQuantity(item, "increase")}>
                      +
                    </Button>
                    <Button onClick={() => onAdjustQuantity(item, "decrease")}>
                      -
                    </Button>
                    <Typography variant="subtitle2">
                      Precio: ${item.price * item.quantity}
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          ))}
          <Typography variant="h6">Total: ${calculateTotal()}</Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginTop="10px"
          >
            <Button
              onClick={onDeleteAll}
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Borrar Todo
            </Button>
            <Button
              onClick={handleOpenDialog}
              variant="contained"
              color="primary"
            >
              Pagar
            </Button>
          </Box>
        </div>
      </Drawer>

      {/* Dialog para opciones de pago */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        PaperProps={{ style: { backgroundColor: "#ddf1ff" } }}
      >
        <DialogTitle>Seleccione método de pago</DialogTitle>
        <DialogContent>
          <RadioGroup
            value={paymentOption}
            onChange={handlePaymentOptionChange}
          >
            <FormControlLabel
              value="tarjeta"
              control={<Radio />}
              label="Pagar con Tarjeta"
            />
            <FormControlLabel
              value="efectivo"
              control={<Radio />}
              label="Pagar con Efectivo"
            />
          </RadioGroup>
          {paymentOption === "tarjeta" && (
            <div>
              <TextField
                label="Nombre del titular de la tarjeta"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Número de tarjeta"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                type="number"
              />
            </div>
          )}
          <TextField
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="DNI"
            name="dni"
            value={formData.dni}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCheckout} color="primary">
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Cart;
