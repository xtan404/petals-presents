import React, { useState, useEffect } from 'react';
import { Box, Button, Table, TableRow, TableHead, TableBody, TableCell, TableContainer, Card, Typography } from '@mui/material';
import PencilOutline from 'mdi-material-ui/PencilOutline';
import TrashCanOutline from 'mdi-material-ui/TrashCanOutline';
import Swal from 'sweetalert2';
import axios from 'axios';
import EditModal from 'src/views/modals/EditModal'; // Adjust import as needed
import router from 'next/router';

interface Product {
  productID: string;
  productName: string;
  productDesc: string;
  price: string;
  productImage: string | null;
}

const ProductsTable = () => {
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProductID, setSelectedProductID] = useState<string | null>(null);

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

  const handleEditClick = (productID: string) => {
    setSelectedProductID(productID);
    setOpenEditModal(true);
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setSelectedProductID(null);
  };

  // DELETE PRODUCTS BY ID
  const handleDeleteItem = (productID: string) => {
    Swal.fire({
      title: "Warning",
      text: "You are about to delete this product. This process cannot be reversed.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Proceed",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:8081/products/${productID}`);
          if (response.data.success) {
            Swal.fire({
              title: "Delete Complete",
              text: "A product has been completely removed.",
              icon: "success",
            }).then(() => {
              setData(data.filter(product => product.productID !== productID));
            });
          } else {
            setError("An error occurred. Please try again later.");
          }
        } catch (error) {
          setError("An error occurred. Please try again later.");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "", "error");
      }
    });
  };

  return (
    <Card>
      <TableContainer>
        <Table sx={{ width: '100%' }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((product) => (
              <TableRow key={product.productID} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>{product.productID}</TableCell>
                <TableCell>
                  {product.productImage && <img src={product.productImage} alt={product.productName} width={50} height={50} />}
                </TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.productDesc}</TableCell>
                <TableCell>₱{product.price}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <PencilOutline
                      color="primary"
                      style={{ cursor: 'pointer', marginRight: 16 }}
                      onClick={() => handleEditClick(product.productID)}
                    />
                    <TrashCanOutline
                      color="error"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleDeleteItem(product.productID)}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedProductID && (
        <EditModal open={openEditModal} handleClose={handleEditModalClose} productID={selectedProductID} />
      )}
      {error && <Typography variant='body1' sx={{ color: '#db4437', marginTop: 2 }}>{error}</Typography>}
    </Card>
  );
};

export default ProductsTable;
