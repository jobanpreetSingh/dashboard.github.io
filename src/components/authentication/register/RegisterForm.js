/* eslint-disable no-undef */
/* eslint-disable import/no-absolute-path */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useUserAuth } from 'src/Auth/Auth'
import { set } from 'lodash';


// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const { signUp } = useUserAuth()
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    validationSchema: RegisterSchema,
  });

  const { isSubmitting } = formik;

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
      await signUp(form.email, form.password);
      navigate('/login')
    } catch (error) {
      setError(error.message)
    }

  }
  return (
    <FormikProvider value={formik}>
      {error && <Alert severity="error">{error}</Alert>}
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack> */}

          <TextField
            fullWidth
            name='email'
            autoComplete="username"
            value={form.email}
            type="email"
            label="Email address"
            onChange={(e) => setformVal(e.target.name, e.target.value)}
          />

          <TextField
            fullWidth
            name='password'
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            value={form.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            onChange={(e) => setformVal(e.target.name, e.target.value)}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
