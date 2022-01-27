/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { mockImgCover } from '../../../utils/mockImages';
//
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
function NewsItem({ news }) {
    const { date, name, } = news;

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Box
                component="img"
                alt={title}
                src={image}
                sx={{ width: 48, height: 48, borderRadius: 1.5 }}
            /> */}
            <Box sx={{ minWidth: 240 }}>
                <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                    <Typography variant="subtitle2" noWrap>
                        Day  {date}
                    </Typography>
                </Link>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                    {name}
                </Typography>
            </Box>
            {/* <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                {formatDistance(postedAt, new Date())}
            </Typography> */}
        </Stack>
    );
}

export default function AppHolidays() {
    const [holidays, setHolidays] = useState();
    const { REACT_APP_HOLIDAYS_URL } = process.env
    const holidaysHandler = async () => {
        try {
            const res = await fetch(REACT_APP_HOLIDAYS_URL)
            const response = await res.json()
            setHolidays(response.holidays)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        holidaysHandler()
    }, [])
    return (
        <Card>
            <CardHeader title="Holidays Hubstaff" />
            <Scrollbar>
                <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                    {holidays && holidays.map((news) => (
                        <NewsItem key={news.id} news={news} />
                    ))}
                </Stack>
            </Scrollbar>

            <Divider />

            <Box sx={{ p: 2, textAlign: 'right' }}>
                <Button
                    to="#"
                    size="small"
                    color="inherit"
                    component={RouterLink}
                    endIcon={<Icon icon={arrowIosForwardFill} />}
                >
                    View all
                </Button>
            </Box>
        </Card>
    );
}
