import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import AppBar from "../components/UI/ToolBar";

interface CartItem {
  productId: number;
  quantity: number;
}

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
}

const ShoppingPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/carts/user/${userId}`);
      const userCart = response.data[0]?.products || [];
      setCartItems(userCart);
    } catch (error) {
      console.error("Failed to fetch cart data", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCart();
      fetchProducts();
    }
  }, [userId]);

  const getProductDetails = (productId: number) =>
    products.find((product) => product.id === productId);

  return (
    <>
      <AppBar />
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        {cartItems.map((item) => {
          const product = getProductDetails(item.productId);
          return product ? (
            <Grid item xs={12} sm={6} md={4} key={item.productId}>
              <Card>
                <CardMedia component="img" height="194" image={product.image} alt={product.title} />
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    Price: ${product.price * item.quantity}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ) : null;
        })}
      </Grid>
    </>
  );
};

export default ShoppingPage;