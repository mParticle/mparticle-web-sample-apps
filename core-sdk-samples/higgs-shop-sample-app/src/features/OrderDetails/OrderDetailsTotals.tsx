import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { formatCurrency } from '../../models/Products';

interface OrderDetailsTotalsProps {
    subTotal: number;
    salesTax?: number | undefined;
    shippingCost?: number | undefined;
    grandTotal?: number | undefined;
}

const OrderDetailsTotalRow: React.FC<{
    label: string;
    amount: number;
    accent?: boolean;
}> = ({ label, amount, accent }) => {
    return (
        <Grid
            item
            xs={12}
            sx={{
                backgroundColor: accent ? '#333333' : '',
                py: 0,
                px: 2,
            }}
        >
            <Typography
                variant='subtitle1'
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: { xs: 329, sm: 448, md: 689 },
                    py: 1,
                    px: 0,
                    borderBottom: '1px solid #333333',
                }}
            >
                <Box component='span'>{label}</Box>
                <Box component='span'>{formatCurrency(amount)}</Box>
            </Typography>
        </Grid>
    );
};

OrderDetailsTotalRow.defaultProps = {
    accent: false,
};

const OrderDetailsTotals: React.FC<OrderDetailsTotalsProps> = ({
    subTotal,
    salesTax,
    shippingCost,
    grandTotal,
}) => {
    return (
        <>
            <OrderDetailsTotalRow label='Subtotal' amount={subTotal} />
            {salesTax && (
                <OrderDetailsTotalRow label='Sales Tax' amount={salesTax} />
            )}

            {shippingCost && (
                <OrderDetailsTotalRow label='Shipping' amount={shippingCost} />
            )}

            {grandTotal && (
                <OrderDetailsTotalRow
                    label='Grand Total'
                    amount={grandTotal}
                    accent
                />
            )}
        </>
    );
};

OrderDetailsTotals.defaultProps = {
    salesTax: undefined,
    shippingCost: undefined,
    grandTotal: undefined,
};

export default OrderDetailsTotals;
