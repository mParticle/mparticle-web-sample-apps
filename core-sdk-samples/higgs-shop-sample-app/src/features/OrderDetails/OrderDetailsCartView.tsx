import React from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import mParticle from '@mparticle/web-sdk';
import { ORDER_PHASES, OrderPhaseTypes } from '../../constants';
import { useOrderDetails } from '../../contexts/OrderDetails';
import OrderDetailsTotals from './OrderDetailsTotals';
import OrderDetailsCard from './OrderDetailsCard';
import { Product } from '../../models/Products';

interface OrderDetailsCartViewProps {
    setOrderPhase: React.Dispatch<React.SetStateAction<OrderPhaseTypes>>;
}

const OrderDetailsCartView: React.FC<OrderDetailsCartViewProps> = ({
    setOrderPhase,
}) => {
    const { items, subTotal, removeFromCart } = useOrderDetails();

    const getMparticleProduct = (
        product: Product,
        quantity: number,
        attributes?: mParticle.SDKEventAttrs,
    ): mParticle.Product => {
        const { label, id, price } = product;

        return mParticle.eCommerce.createProduct(
            label,
            id,
            price,
            quantity,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            attributes,
        );
    };

    const handleRemoveFromCart = (itemId: string) => {
        const { product, quantity, variants } = items[itemId];

        const mParticleProduct = getMparticleProduct(
            product,
            quantity,
            variants,
        );

        mParticle.eCommerce.logProductAction(
            mParticle.ProductActionType.RemoveFromCart,
            mParticleProduct,
        );

        removeFromCart(itemId);
    };

    const handleCheckout = () => {
        const mParticleProducts = Object.keys(items).map((item) => {
            const { product, quantity, variants } = items[item];

            return getMparticleProduct(product, quantity, variants);
        });

        // These attributes are optional and can be ignored. They are being listed here
        // for clarity.
        // Custom Attributes are used to add additional transactional data to your
        // product actions, such as sales or conversion campaign identifiers
        const customAttributes: mParticle.SDKEventAttrs = {};

        // Custom Flags are used to pass configuration options to forwarders and kits
        // For more details: https://docs.mparticle.com/developers/sdk/web/event-tracking/#custom-flags
        const customFlags: mParticle.SDKEventCustomFlags = {};

        mParticle.eCommerce.logProductAction(
            mParticle.ProductActionType.Checkout,
            mParticleProducts,
            customAttributes,
            customFlags,
        );
        setOrderPhase(ORDER_PHASES.REVIEW);
    };

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
                                buttonAction={
                                    <Button
                                        variant='text'
                                        size='small'
                                        sx={{ mx: 0, px: 0 }}
                                        onClick={() =>
                                            handleRemoveFromCart(item)
                                        }
                                    >
                                        Remove
                                    </Button>
                                }
                            />
                        </Grid>
                    );
                })}

                <OrderDetailsTotals subTotal={subTotal} />
                <Grid item>
                    <Button
                        variant='contained'
                        fullWidth
                        size='large'
                        onClick={handleCheckout}
                    >
                        Checkout *
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

export default OrderDetailsCartView;
