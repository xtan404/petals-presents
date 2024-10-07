import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

interface CardAppleWatchProps {
  addToCart: (product: { productName: string; productDesc: string; price: string }) => void;
}

const CardAppleWatch: React.FC<CardAppleWatchProps> = ({ addToCart }) => {
  const product = {
    productName: "Chocolate Truffles",
    productDesc: " ",
    price: "299.00", // Change this to a numeric string
  };

  return (
    <Card>
      <CardMedia sx={{ height: '9.375rem' }} image='/images/cards/chocolate-truffles.jpg' />
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          {product.productName}
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          ${product.price}  {/* Display with a dollar sign */}
        </Typography>
        <Typography variant='body2'>
          {product.productDesc}
        </Typography>
      </CardContent>
      <Button
        onClick={() => addToCart(product)}
        variant='contained'
        sx={{ py: 2.5, width: '100%' }}
      >
        Add To Cart
      </Button>
    </Card>
  );
};

export default CardAppleWatch;
