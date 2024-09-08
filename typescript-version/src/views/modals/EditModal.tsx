import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import ClipboardTextMultipleOutline from "mdi-material-ui/ClipboardTextMultipleOutline";
import Swal from "sweetalert2";

interface EditModalProps {
  open: boolean;
  handleClose: () => void;
  productID: string; // Ensure productID is passed as a prop
}

const EditModal: React.FC<EditModalProps> = ({ open, handleClose, productID }) => {
  const [product, setProduct] = useState({ productName: '', productDesc: '', price: '' });
  const [error, setError] = useState("");

  useEffect(() => {
    if (productID) {
      axios.get(`http://localhost:8081/products/${productID}`)
        .then((response) => {
          setProduct(response.data);
          formik.setValues(response.data)
        })
        .catch((err) => {
          console.error('Error fetching product:', err);
        });
    }
  }, [productID]);

 const formik = useFormik({
    initialValues: {
      productName: product.productName,
      productDesc: product.productDesc,
      price: product.price,
    },
    enableReinitialize: true, // Add this line to update initialValues when product changes
    validationSchema: Yup.object({
      productName: Yup.string().required("Name is required."),
      productDesc: Yup.string().required("Description is required."),
      price: Yup.number().required("Price is required."),
    }),
    onSubmit: (values) => {
      handleUpdateItem(values);
    },
  }); 

  const handleUpdateItem = (values: {
    productName: string;
    productDesc: string;
    price: string;
  }) => {
    try {
      axios.put(`http://localhost:8081/products/${productID}`, values)
      handleClose();
        Swal.fire({
        title: 'Success',
        text: 'Product has been successfully modified.',
        icon: 'success'
      })
      .then(() => {
        window.location.reload();
      })
    } catch (error) {
      console.error("There was an error updating the product.", error)
    }
    
    
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant='h4' sx={{ fontWeight: 600, marginBottom: 2 }}>
          <ClipboardTextMultipleOutline /> Edit Product {productID}
        </Typography>
        <form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id='productName'
            label='Product Name'
            sx={{ marginBottom: formik.touched.productName && formik.errors.productName ? 1.5 : 4 }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.productName}
          />
          {formik.touched.productName && formik.errors.productName ? (
            <Typography variant='body1' sx={{ color: '#db4437', paddingTop: 1, paddingLeft: 3, marginBottom: 3 }}>
              {formik.errors.productName}
            </Typography>
          ) : null}

          <TextField
            fullWidth
            id='productDesc'
            label='Product Description'
            sx={{ marginBottom: formik.touched.productDesc && formik.errors.productDesc ? 1.5 : 4 }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.productDesc}
          />
          {formik.touched.productDesc && formik.errors.productDesc ? (
            <Typography variant='body1' sx={{ color: '#db4437', paddingTop: 1, paddingLeft: 3, marginBottom: 3 }}>
              {formik.errors.productDesc}
            </Typography>
          ) : null}

          <TextField
            fullWidth
            id='price'
            label='Price'
            sx={{ marginBottom: formik.touched.price && formik.errors.price ? 1.5 : 4 }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          {formik.touched.price && formik.errors.price ? (
            <Typography variant='body1' sx={{ color: '#db4437', paddingTop: 1, paddingLeft: 3, marginBottom: 3 }}>
              {formik.errors.price}
            </Typography>
          ) : null}

          <Button
            fullWidth
            type='submit'
            variant='contained'
            color='primary'
            sx={{ marginBottom: 2 }}
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Update Product
          </Button>
        </form>
        {error && <Typography variant='body1' sx={{ color: '#db4437', marginTop: 2 }}>{error}</Typography>}
      </Box>
    </Modal>
  );
};

export default EditModal;
