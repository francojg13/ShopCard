import { Card, CardContent, Button, Typography, CardMedia, CardActionArea } from "@mui/material";

const ProductList = ({ products, onAddToCart }) => { // Componente para mostrar lista de productos
  return (
    <div>
      {products.map((product) => (
        <Card
          key={product.id}
          style={{
            marginTop: "50px",
            width: "250px",
            borderRadius: "15px",
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="200px"
              image={product.image}
              alt={product.name}
              style={{ objectFit: "contain" }}
            />
            <CardContent>
              <Typography variant="subtitle1">{product.name}</Typography>
              <Typography variant="subtitle2" color="#616161">
                Precio: ${product.price}
              </Typography>
              <Button
                onClick={() => onAddToCart(product)}
                style={{ margin: "auto", marginTop: "20px", display: "block" }}
                variant={"contained"}
              >
                Agregar al carrito
              </Button>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
