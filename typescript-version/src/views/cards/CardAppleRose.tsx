// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import router from 'next/router'

const CardAppleWatch = () => {
  return (
    <Card>
      <CardMedia sx={{ height: '9.375rem' }} image='/images/cards/rose.jpg' />
      <CardContent sx={{ padding: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          Rose
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>$249.40</Typography>
        <Typography variant='body2'>
          A bouquet of Rose for your loved ones in any occasion
        </Typography>
      </CardContent>
      <Button onClick={() => router.push("/pages/shop")} variant='contained' sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        Add To Cart
      </Button>
    </Card>
  )
}

export default CardAppleWatch
