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
    const { id, name } = news;

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
                        {id}
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

export default function AppMondayCom() {
    const [monday, setMonday] = useState();
    const mondayCOM = async () => {
        try {
            const res = await fetch("https://api.monday.com/v2", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE0Mjc4NDE3NCwidWlkIjoyNzQ0Nzg2MCwiaWFkIjoiMjAyMi0wMS0yNlQxNjowNjowMC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTEwMTQ4NzEsInJnbiI6InVzZTEifQ.1-BtSLMLAzW_2g90M5CHQz3jStzYuq3uRqY6YddSgik'
                },
                body: JSON.stringify({
                    'query': '{ boards (limit:5)  {id name}  }'
                })
            });
            const response = await res.json()
            setMonday(response.data.boards)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        mondayCOM()
    }, [])
    return (
        <Card>
            <CardHeader title="Data From monday.com" />
            <Scrollbar>
                <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                    {monday && monday.map((news) => (
                        <NewsItem key={news.title} news={news} />
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
