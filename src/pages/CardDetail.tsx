import AppBar from "../components/UI/ToolBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}
function CardDetail() {
  const { id } = useParams<{ id: string }>();
  const [showAlert, setShowAlert] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);

  const fetchProduct = async () => {
    try {
      const response = await axios.get<Product>(
        `https://fakestoreapi.com/products/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Failed to fetch product", error);
    }
  };

  const handleRatingChange = async (newValue: number | null) => {
    if (!product || newValue === null) return;

    const newCount = product.rating.count + 1;
    const newRate =
      (product.rating.rate * product.rating.count + newValue) / newCount;

    const updatedProduct = {
      ...product,
      rating: {
        rate: parseFloat(newRate.toFixed(1)),
        count: newCount,
      },
    };

    setProduct(updatedProduct);
    setUserRating(newValue);

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2500);

    try {
      const response = await axios.put(
        `https://fakestoreapi.com/products/${id}`,
        updatedProduct
      );
      console.log("Rating successfully updated on the server:", response.data);
    } catch (error) {
      console.error("Failed to update rating on server:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
          <AppBar />
      {showAlert && (
        <Stack sx={{ width: "100%", mb: 2 }} spacing={2}>
          <Alert severity="success">
            Your rating has been added successfully!
          </Alert>
        </Stack>
      )}
      <Card sx={{ maxWidth: 600, margin: "auto", mt: 4 , marginTop:"5%"}}>
        <CardMedia
          component="img"
          height="300"
          image={product.image}
          alt={product.title}
        />
        <CardContent>
          <Typography variant="h5">{product.title}</Typography>
          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Typography variant="h6" color="text.primary">
              {`Price: $${product.price}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Rating: ${product.rating.rate} (${product.rating.count} reviews)`}
            </Typography>
            <Rating
              name="user-rating"
              value={userRating}
              onChange={(event, newValue) => handleRatingChange(newValue)}
            />
          </Box>
        </CardContent>
      </Card>
    </>
  )

  
}

export default CardDetail;
