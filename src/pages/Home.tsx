import { useEffect, useState } from "react";
import * as React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

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

function Home() {
  const [value, setValue] = React.useState<number | null>(2);
  const [data, setData] = useState<Product[]>([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get<Product[]>(
        "https://fakestoreapi.com/products"
      );
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCardClick = (id: number) => {
    navigate(`/card/${id}`);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      {data.map((item) => (
        <Grid item xs={12} sm={4} md={4} key={item.id}>
          <Card
            sx={{ maxWidth: 345, cursor: "pointer" }}
            onClick={() => handleCardClick(item.id)}
          >
            <CardHeader title={item.title} />
            <CardMedia
              component="img"
              height="194"
              image={item.image}
              alt={item.title}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={2}
              >
                <Typography variant="h6" color="text.secondary">
                  {`$${item.price}`}
                </Typography>
                <Rating name="read-only" value={value} readOnly />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Home;
