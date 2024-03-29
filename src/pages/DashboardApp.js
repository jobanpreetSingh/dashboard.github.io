/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-key */
// react
import React, { useState, useEffect } from 'react';

// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
} from '../components/_dashboard/app';
import AppMondayCom from 'src/components/_dashboard/app/AppMondayCom';
import AppHolidays from 'src/components/_dashboard/app/AppHolidays';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [organization, setOrganization] = useState();
  const { REACT_APP_ORGANIZATION_URL } = process.env
  const getOrganization = async () => {
    try {
      const response = await fetch(REACT_APP_ORGANIZATION_URL);
      const organization = await response.json();
      setOrganization(organization)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOrganization()
  }, [])
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          {organization ? organization.organizations.map((data) => <Typography key={data.id.toString()} variant="h4">{data.name}</Typography>) : ``}

        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppMondayCom />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppHolidays />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>


          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
