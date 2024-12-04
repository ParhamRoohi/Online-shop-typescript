import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

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
  const [product, setProduct] = useState<Product | null>(null);

  const fetchProduct = async () => {
    try {
      const response = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Failed to fetch product", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <CardMedia component="img" height="300" image={product.image} alt={product.title} />
      <CardContent>
        <Typography variant="h5">{product.title}</Typography>
        <Typography variant="body1" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" color="text.primary">
          {`Price: $${product.price}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Rating: ${product.rating.rate} (${product.rating.count} reviews)`}
        </Typography>
        {/* <Stack direction="row" spacing={4} sx={{ alignItems: 'flex-end' }}>
        <Icon baseClassName="fas" className="fa-plus-circle" color="primary" />
        </Stack> */}
      </CardContent>
    </Card>
  );
}

export default CardDetail;