import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import MuiTab, { TabProps } from '@mui/material/Tab';
import { SyntheticEvent, useState } from 'react';
import TableBasic from 'src/views/tables/TableBasic';
import React from 'react';
import CardMobile from 'src/views/cards/CardMobile';
import CardAppleWatch from 'src/views/cards/CardAppleWatch';
import CardBlueFlower from 'src/views/cards/CardBlueFlower';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import FlowerOutline from 'mdi-material-ui/FlowerOutline';
import Candy from 'mdi-material-ui/Candy';
import GiftOutline from 'mdi-material-ui/GiftOutline';
import Pagination from 'src/@core/theme/overrides/pagination';
import ProductsTable from 'src/views/admin-tables/ProductsTable';
import Button from '@mui/material/Button';
import PlusThick from 'mdi-material-ui/PlusThick';
import Swal from 'sweetalert2';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router'
import Typography from '@mui/material/Typography';
import ClipboardTextMultipleOutline from 'mdi-material-ui/ClipboardTextMultipleOutline'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

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

const Products = () => {
  const [value, setValue] = useState<string>('flowers');
  const [open, setOpen] = useState(false);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      productName: '',
      productDesc: '',
      price: '',
      productImage: ''
    },
    validationSchema: Yup.object({
      productName: Yup.string().required('Product Name is required'),
      productDesc: Yup.string().required('Product Description is required'),
      price: Yup.string().required('Product Price is required'),
    }),
    onSubmit: (values) => {
      handleAddProduct(values);
    }
  });

  const handleAddProduct = async (values: {
    productName: string,
    productDesc: string,
    price: string,
 }) => {
    try {
      const response = await axios.post('http://localhost:8081/add_product', values);
      Swal.fire({
        title: 'Success',
        text: 'A new product has been successfully added.',
        icon: 'success'
      })
      .then(() => {
         window.location.reload();
      });
      formik.resetForm();
    } catch (error) {
      console.error('There was an error registering!', error);
      Swal.fire({
        title: 'Error',
        text: 'New product was not added. Please try again.',
        icon: 'error'
      });
    }
    handleClose()
  };

  return (
    <Card>
      <TabContext value={value}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
          <TabList
            onChange={handleChange}
            aria-label='account-settings tabs'
            sx={{ flexGrow: 1 }}
          >
            <Tab
              value='flowers'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TabName>Purok 1</TabName>
                </Box>
              }
            />
            <Tab
              value='chocolates'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TabName>Purok 2</TabName>
                </Box>
              }
            />
            <Tab
              value='presents'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TabName>Purok 3</TabName>
                </Box>
              }
            />
          </TabList>
          <Box sx={{ padding: 2 }}>
            <Button variant='contained' color='primary' onClick={handleOpen}>
              <PlusThick />
            </Button>
          </Box>
        </Box>

        <TabPanel sx={{ p: 0 }} value='flowers'>
          <Grid item xs={12} sm={6} md={3}>
          </Grid>
          <ProductsTable />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='chocolates'>
          <Grid container spacing={5} sx={{ padding: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
            </Grid>
            <TableBasic />
          </Grid>
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='presents'>
          <Grid container spacing={5} sx={{ padding: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
            </Grid>
            <TableBasic />
          </Grid>
        </TabPanel>
      </TabContext>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            
            <Typography
              variant='h4' sx={{ fontWeight: 600, marginBottom: 8 }}>
             <ClipboardTextMultipleOutline/> New Product Details
              </Typography>
              </Box>
            <TextField autoFocus fullWidth id='productName' label='Product Name'
              sx={{ marginBottom: formik.touched.productName && formik.errors.productName ? 1.5 : 4 }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.productName} />
            {formik.touched.productName && formik.errors.productName ? (
              <Typography variant='body1' sx={{ color: '#db4437', paddingTop: 1, paddingLeft: 3, marginBottom: 3 }}>
                {formik.errors.productName}
              </Typography>
            ) : null}
            <TextField fullWidth id='productDesc' label='Product Description'
              sx={{ marginBottom: formik.touched.productDesc && formik.errors.productDesc ? 1.5 : 4 }}
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.productDesc} />
            {formik.touched.productDesc && formik.errors.productDesc ? (
              <Typography variant='body1' sx={{ color: '#db4437', paddingTop: 1, paddingLeft: 3, marginBottom: 3 }}>
                {formik.errors.productDesc}
              </Typography>
            ) : null}
            <TextField fullWidth id='price' label='Price'
              sx={{ marginBottom: formik.touched.price && formik.errors.price ? 1.5 : 4 }}
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.price} />
            {formik.touched.price && formik.errors.price ? (
              <Typography variant='body1' sx={{ color: '#db4437', paddingTop: 1, paddingLeft: 3, marginBottom: 3 }}>
                {formik.errors.price}
              </Typography>
            ) : null}
            <Button fullWidth type='submit' variant='contained' color= 'primary' sx={{ marginBottom: 2 }}
              disabled={!formik.isValid || formik.isSubmitting}>
              Add product
              </Button>
            </form>
        </Box>
      </Modal>
    </Card>
  );
};

export default Products;
