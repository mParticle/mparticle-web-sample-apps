import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

const OrderDetailsEmpty: React.FC = () => {
    return (
        <>
            <Box sx={{ my: 5 }}>
                <Typography variant='h3'>My Cart</Typography>
            </Box>
            <Grid
                container
                rowSpacing={2}
                columns={1}
                direction='column'
                alignItems='center'
                justifyContent='center'
            >
                <Grid item xs={12}>
                    <Typography variant='body1'>
                        Your cart is currently empty
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default OrderDetailsEmpty;
