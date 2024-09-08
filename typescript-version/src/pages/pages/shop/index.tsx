import React, { SyntheticEvent, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import MuiTab, { TabProps } from '@mui/material/Tab';
import Card from '@mui/material/Card';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FlowerOutline from 'mdi-material-ui/FlowerOutline';
import Candy from 'mdi-material-ui/Candy';
import GiftOutline from 'mdi-material-ui/GiftOutline';
import axios from 'axios';
import router from 'next/router';
import CardAppleWatch from 'src/views/cards/CardAppleWatch';
import CardMobile from 'src/views/cards/CardMobile';
import CardBlueFlower from 'src/views/cards/CardBlueFlower';
import CardAppleRose from 'src/views/cards/CardAppleRose';
import Swal from 'sweetalert2';

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}));

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

interface Product {
  productID: string;
  productName: string;
  productDesc: string;
  price: string;
  productImage: string | null;
}

const Shop = () => {
  const [value, setValue] = useState<string>('flowers');
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.push("/401");
    }
    fetch('http://localhost:8081/products')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleAddToCart = async (product: Product
  ) => { 
    try {
      const response = await axios.post('http://localhost:8081/add_to_cart', {
        order_name: product.productName,
        order_description: product.productDesc,
        order_price: product.price
      })
        .then(response => {
          window.location.reload()
        })
    } catch(error){
      console.error('There was an error adding the order!', error);
    };
  };

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='flowers'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FlowerOutline />
                <TabName>Flowers</TabName>
              </Box>
            }
          />
          <Tab
            value='chocolates'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Candy />
                <TabName>Chocolates</TabName>
              </Box>
            }
          />
          <Tab
            value='presents'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <GiftOutline />
                <TabName>Presents</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value="flowers">
  <Grid container spacing={5} sx={{ paddingInlineStart: 2, paddingInlineEnd: 2, paddingTop: 2, paddingBottom: 2 }}>
    {/* Render CardAppleWatch outside the loop */}
    <Grid item xs={12} sm={6} md={3}>
      <CardAppleWatch />
    </Grid>
    {/* Render CardBlueFlower outside the loop */}
    <Grid item xs={12} sm={6} md={3}>
      <CardBlueFlower/>
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <CardAppleRose/>
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <CardAppleWatch/>
    </Grid>
    {/* Render other cards inside the loop */}
    {data.map((product) => (
      <Grid item xs={12} sm={6} md={3} key={product.productID}>
        <Card sx={{ boxShadow: 3}}>
          <CardMedia sx={{ height: '9.375rem' }} image={product.productImage || '/images/cards/moneybouquet.jpg'} />
          <CardContent sx={{ padding: (theme) => `${theme.spacing(3, 5.25, 4)} !important`, maxHeight: '10rem', overflow: 'auto' }}>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              {product.productName}
            </Typography>
            <Typography sx={{ marginBottom: 2 }}>
              ${product.price}
            </Typography>
            <Typography variant='body2'>
              {product.productDesc}
            </Typography>
          </CardContent>
          <Button
            variant='contained'
            sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            onClick={() => handleAddToCart(product)}
          >
            Add To Cart
          </Button>
        </Card>
      </Grid>
    ))}
  </Grid>
</TabPanel>
<TabPanel sx={{ p: 0 }} value='security'>
</TabPanel>
<TabPanel sx={{ p: 0 }} value='info'>
</TabPanel>
</TabContext>
</Card>
  );
};

export default Shop;
