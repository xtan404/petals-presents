import { useState, useEffect, Fragment, ReactNode, SyntheticEvent } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled, Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MuiMenu, { MenuProps } from '@mui/material/Menu';
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar';
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import Typography, { TypographyProps } from '@mui/material/Typography';
import PayPal from 'src/@core/layouts/components/shared-components/paypal/PayPal';

// ** Icons Imports
import CartOutline from 'mdi-material-ui/CartOutline';
import router from 'next/router';

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar';

// ** Styled Menu component
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}));

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
};

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
});

// ** Styled Avatar component
const Avatar = styled(MuiAvatar)<AvatarProps>({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem'
});

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}));

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
});

interface Order {
  order_name: string;
  order_description: string;
  order_price: string;
}

const CartDropdown = () => {
  const [data, setData] = useState<Order[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [checkout, setCheckOut] = useState(false);

  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn) {
      router.push('/401');
    }
    fetch('http://localhost:8081/orders')
      .then((res) => res.json())
      .then((data: Order[]) => {
        setData(data);
        calculateTotal(data); // Calculate total price
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateTotal = (orders: Order[]) => {
    const total = orders.reduce((acc, order) => acc + parseFloat(order.order_price), 0);
    setTotalPrice(total);
  };
  

  // Add the new product to the cart
  const addToCart = (product: Order) => {
    const updatedCart = [...data, product];
    setData(updatedCart);
    calculateTotal(updatedCart); // Update the total price
  };

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>;
    } else {
      return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>;
    }
  };

  return (
    <Fragment>
      <IconButton color="inherit" aria-haspopup="true" onClick={handleDropdownOpen} aria-controls="customized-menu">
        <CartOutline />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disableRipple>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ fontWeight: 600 }}>Shopping Cart</Typography>
          </Box>
        </MenuItem>
        <ScrollWrapper>
          {data.map((order, key) => (
            <MenuItem key={key} onClick={handleDropdownClose}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <Avatar alt="Product Image" src='/images/cards/tulips.jpg' />
                <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                  <MenuItemTitle>{order.order_name}</MenuItemTitle>
                  <MenuItemSubtitle variant="body2">{order.order_description}</MenuItemSubtitle>
                </Box>
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                  ${order.order_price}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </ScrollWrapper>

        {/* Total Amount */}
        <MenuItem disableRipple sx={{ py: 1, borderBottom: 0, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', mx: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Total:
              <MenuItemTitle sx={{ fontWeight: 'bold', color: 'primary.main' }}>${totalPrice}</MenuItemTitle>
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem disableRipple sx={{ py: 3.5, borderBottom: 0, display: 'flex', flexDirection: 'column' }}>
          {checkout ? <PayPal /> : <Button variant="contained" onClick={() => setCheckOut(true)}>Checkout</Button>}
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default CartDropdown;
