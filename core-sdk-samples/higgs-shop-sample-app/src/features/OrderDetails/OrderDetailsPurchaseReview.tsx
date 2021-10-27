import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import mParticle from '@mparticle/web-sdk';
import { useOrderDetails } from '../../contexts/OrderDetails';
import OrderDetailsTotals from './OrderDetailsTotals';
import OrderDetailsCustomerDetails from './OrderDetailsCustomerDetails';
import { ORDER_PHASES, OrderPhaseTypes } from '../../constants';
import OrderDetailsCard from './OrderDetailsCard';

interface OrderDetailsPurchaseReviewProps {
    setOrderPhase: React.Dispatch<React.SetStateAction<OrderPhaseTypes>>;
}

const OrderDetailsPurchaseReview: React.FC<OrderDetailsPurchaseReviewProps> = ({
    setOrderPhase,
}) => {
    const { items, subTotal, salesTax, shippingCost, grandTotal, resetCart } =
        useOrderDetails();

    const handleOrderComplete = () => {
        const mParticleProducts = Object.keys(items).map((item) => {
            const { product, quantity, variants } = items[item];

            const color = variants?.color;
            const size = variants?.size;

            return mParticle.eCommerce.createProduct(
                product.label,
                product.id,
                product.price,
                quantity,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                { color, size },
            );
        });

        // These attributes are optional and can be ignored. They are being listed here
        // for clarity.
        // Custom Attributes are used to add additional transactional data to your
        // product actions, such as sales or conversion campaign identifiers
        const customAttributes: mParticle.SDKEventAttrs = {};

        // Custom Flags are used to pass configuration options to forwarders and kits
        // For more details: https://docs.mparticle.com/developers/sdk/web/event-tracking/#custom-flags
        const customFlags: mParticle.SDKEventCustomFlags = {};

        // Transaction Attributes are used mostly for when a transaction is complete
        // This is optional but requires a transaction ID if you plan on sending this.
        //
        // Depending on your use case, your transaction ID can be any unique
        // identifier for a completed transaction. In this example we are simply
        // generating a string based on Epoch for demonstration purposes
        const transactionAttributes: mParticle.TransactionAttributes = {
            Id: `${Date.now()}`, // Using Epoch for demonstration purposes
            Revenue: grandTotal,
            Tax: salesTax,
        };

        mParticle.eCommerce.logProductAction(
            mParticle.ProductActionType.Purchase,
            mParticleProducts,
            customAttributes,
            customFlags,
            transactionAttributes,
        );

        resetCart();
        setOrderPhase(ORDER_PHASES.COMPLETE);
    };

    return (
        <>
            <Box
                sx={{
                    my: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Button
                    variant='text'
                    color='primary'
                    startIcon={<ArrowBackIosIcon />}
                    onClick={() => setOrderPhase(ORDER_PHASES.IN_PROGRESS)}
                >
                    Back to Cart
                </Button>
                <Typography variant='h3'>Checkout</Typography>
            </Box>
            <Grid
                container
                rowSpacing={2}
                columns={1}
                direction='column'
                alignItems='center'
                justifyContent='center'
                sx={{
                    my: 5,
                }}
            >
                <OrderDetailsCustomerDetails />

                <Grid item xs={12}>
                    <Typography variant='h6'>Review Order *</Typography>
                </Grid>

                {Object.keys(items).map((item) => {
                    const { product, variants, quantity, totalAmount } =
                        items[item];
                    return (
                        <Grid item key={item}>
                            <OrderDetailsCard
                                productAttributes={{
                                    id: item,
                                    sku: product.id,
                                    label: product.label,
                                    altText: product.label,
                                    imageUrl: product.imageUrl,
                                    quantity,
                                    price: product.price,
                                    total: totalAmount,
                                    color: variants?.color,
                                    size: variants?.size,
                                }}
                            />
                        </Grid>
                    );
                })}

                <OrderDetailsTotals
                    subTotal={subTotal}
                    salesTax={salesTax}
                    shippingCost={shippingCost}
                    grandTotal={grandTotal}
                />

                <Grid item>
                    <Button
                        variant='contained'
                        fullWidth
                        size='large'
                        onClick={handleOrderComplete}
                    >
                        Place Order *
                    </Button>
                </Grid>
                <Grid item>
                    <Typography variant='caption'>
                        * Demonstration Only
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default OrderDetailsPurchaseReview;
