// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { useState, useEffect } from 'react'
import router from 'next/router'

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}


const statusObj: StatusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

const OrderTable = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.push("/401");
    }
    fetch("http://localhost:8081/accounts")
      .then((res) => res.json())
      .then((data) => setData(data))
    .catch((err) => console.log(err))
  }, [])
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 900 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'inline-block', padding: '4px 8px', backgroundColor: 'yellow', borderRadius: '16px', color: 'white' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>Sunflower</Typography>
                  </Box>
                </TableCell>
                <TableCell>an annual herbaceous plant belonging to the Asteraceae family.</TableCell>
                <TableCell>October 10, 2024</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'inline-block', padding: '4px 8px', backgroundColor: 'lightblue', borderRadius: '16px', color: 'white' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>Forget-Me-Not</Typography>
                  </Box>
                </TableCell>
                <TableCell>a genus of flowering plants in the family Boraginaceae, known as scorpion grass.</TableCell>
                <TableCell>October 2, 2024</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'inline-block', padding: '4px 8px', backgroundColor: 'pink', borderRadius: '16px', color: 'white' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>Rose</Typography>
                  </Box>
                </TableCell>
                <TableCell>perennial flowering plants renowned for their beauty and fragrance.</TableCell>
                <TableCell>September 2, 2024</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default OrderTable
