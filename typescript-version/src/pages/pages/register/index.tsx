import { useState, Fragment, ChangeEvent, MouseEvent, ReactNode } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Swal from 'sweetalert2';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled, useTheme } from '@mui/material/styles';
import MuiCard, { CardProps } from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router'

import Google from 'mdi-material-ui/Google';
import Github from 'mdi-material-ui/Github';
import Twitter from 'mdi-material-ui/Twitter';
import Facebook from 'mdi-material-ui/Facebook';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';

import BlankLayout from 'src/@core/layouts/BlankLayout';
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration';

interface State {
  password: string;
  showPassword: boolean;
}

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}));

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}));

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}));

const RegisterPage = () => {
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  });
  

  const theme = useTheme();

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string().email('Invalid Email Address').required('Email is required'),
      password: Yup.string().min(8, 'Password must at least be 8 characters').required('Password is required')
    }),
    onSubmit: (values) => {
      handleAddItem(values);
    }
  });
  const handleAddItem = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post('http://localhost:8081/register', values);
      Swal.fire({
        title: 'Registered Successfully',
        text: 'You can now log in with your account',
        icon: 'success'
      }).then
      formik.resetForm()
      Router.push("/")
    } catch (error) {
      console.error('There was an error registering!', error);
      Swal.fire({
        title: 'Error',
        text: 'There was an error registering your account.',
        icon: 'error'
      });
    }
  };

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid sx={{ paddingTop: 2, paddingRight: 2 }}>
              <img src='/images/logos/mainlogo.png' alt="Logo" style={{ paddingTop: 5, paddingLeft: 12, height: '100px' }} />
            </Grid>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Create your account here
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
            <TextField autoFocus fullWidth id='firstName' label='First Name'
              sx={{ marginBottom: formik.touched.firstName && formik.errors.firstName ? 1.5 : 4 }}
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName} />
            {formik.touched.firstName && formik.errors.firstName ? (
              <Typography variant='body1' sx={{ color: '#db4437', paddingTop: 1, paddingLeft: 3, marginBottom: 3 }}>
                {formik.errors.firstName}
              </Typography>
            ) : null}
            <TextField fullWidth id='lastName' label='Last Name'
              sx={{ marginBottom: formik.touched.lastName && formik.errors.lastName ? 1.5 : 4 }}
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName} />
            {formik.touched.lastName && formik.errors.lastName ? (
              <Typography variant='body1' sx={{ color: '#db4437', paddingTop: 1, paddingLeft: 3, marginBottom: 3 }}>
                {formik.errors.lastName}
              </Typography>
            ) : null}
            <TextField fullWidth type='email' id='email' label='Email'
              sx={{ marginBottom: formik.touched.email && formik.errors.email ? 1.5 : 4 }}
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
            {formik.touched.email && formik.errors.email ? (
              <Typography variant='body1' sx={{ color: '#db4437', paddingTop: 1, paddingLeft: 3, marginBottom: 3 }}>
                {formik.errors.email}
              </Typography>
            ) : null}
            <FormControl fullWidth>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                id='password'
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formik.touched.password && formik.errors.password ? (
                <Typography variant='body1' sx={{ color: '#db4437', paddingTop: 1, paddingLeft: 3, marginBottom: 3 }}>
                  {formik.errors.password}
                </Typography>
              ) : null}
            </FormControl>
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Fragment>
                  <span>I agree to </span>
                  <Link href='/' passHref>
                    <LinkStyled onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                      privacy policy & terms
                    </LinkStyled>
                  </Link>
                </Fragment>
              }
            />
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 7 }}
              disabled={!formik.isValid || formik.isSubmitting}>
              Sign up
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Already have an account?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/'>
                  <LinkStyled>Sign in instead</LinkStyled>
                </Link>
              </Typography>
            </Box>
            <Divider sx={{ my: 5 }}>or</Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Facebook sx={{ color: '#497ce2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Twitter sx={{ color: '#1da1f2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Github sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : theme.palette.grey[300]) }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Google sx={{ color: '#db4437' }} />
                </IconButton>
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  );
};

RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default RegisterPage;
