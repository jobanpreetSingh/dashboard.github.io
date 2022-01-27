/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-unresolved */
import * as Yup from 'yup';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Alert } from '@mui/material'
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useUserAuth } from 'src/Auth/Auth'

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, currentUser } = useUserAuth()

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      remember: true
    },
    validationSchema: LoginSchema,
  });

  const { values, isSubmitting, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const setformVal = (key, val) => {
    setForm({
      ...form,
      [key]: val
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await login(form.email, form.password);
      console.log('current user', currentUser)
      navigate('/dashboard/app')
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <FormikProvider value={formik}>
      {error && <Alert severity="error">{error}</Alert>}
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            name='email'
            value={form.email}
            onChange={(e) => setformVal(e.target.name, e.target.value)}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            name='password'
            value={form.paassword}
            onChange={(e) => setformVal(e.target.name, e.target.value)}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}