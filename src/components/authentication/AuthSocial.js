/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
// material
import { Stack, Button, Divider, Typography, Alert } from '@mui/material';
import { useUserAuth } from 'src/Auth/Auth';
// ----------------------------------------------------------------------

export default function AuthSocial() {
  const navigate = useNavigate();
  const { signInWithGoogle } = useUserAuth();
  const [error, setError] = useState("");
  const handleSignInWithGoogle = async (e) => {
    e.preventDefault()
    try {
      await signInWithGoogle()
      navigate('/dashboard/app')
    } catch (error) {
      setError(error.message)
      console.log(error.message)
    }
  }
  return (
    <>
      <Stack direction="row" spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={(e) => handleSignInWithGoogle(e)}>
          <Icon icon={googleFill} color="#DF3E30" height={24} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Icon icon={facebookFill} color="#1877F2" height={24} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Icon icon={twitterFill} color="#1C9CEA" height={24} />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
