import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    Grid,
    Box,
    Typography,
    FormControl,
    SelectChangeEvent,
    TextField,
    Button,
    Snackbar,
} from '@mui/material';
import mParticle from '@mparticle/web-sdk';
import { Page } from '../../layouts/Page';
import { formatCurrency, Product, getProductById } from '../../models/Products';
import { WrappedTypography } from '../../components/WrappedTypography';
import { BackButton } from '../../components/BackButton';
import { ProductVariantSelect } from '../../features/ProductDetails';
import { useOrderDetails } from '../../contexts/OrderDetails';

const ProductDetailPage: React.FC = () => {
    const classes = {
        mobileResponsive: {
            display: { xs: 'flex', md: 'none' },
        },
        desktopResponsive: {
            display: { xs: 'none', md: 'flex' },
        },
    };

    const { id: productId } = useParams();

    const [product, setProduct] = useState<Product | null>(null);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [toastVisible, setToastVisible] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const { addToCart } = useOrderDetails();

    // It is recommended to use mParticle.createProduct when using our
    // eCommerce logging functions to generate events so that you can
    // be sure to include all of our data points properly
    const getMPProduct = (_product: Product): mParticle.Product => {
        const { label, id, price } = _product;

        // When passing attributes into mParticle, it's best to not include
        // undefined or null values
        const attributes: mParticle.SDKEventAttrs = {};

        if (color) {
            attributes.color = color;
        }

        if (size) {
            attributes.size = size;
        }

        // In this example we are not fulling handling multiple brands,
        // categories and other use cases for a fully fledged e-Commerce
        // application. As such, we are passing undefined for many of these
        // attributes to highlight cases where you want may need some
        // parameters but not all of them.
        return mParticle.eCommerce.createProduct(
            label,
            id,
            price,
            parseInt(quantity, 10),
            undefined, // Variant: used for single variants.
            // Use Custom ATtributes for multiple variants like
            // in this use case
            undefined, // Category
            undefined, // Brand
            undefined, // Position
            undefined, // Coupon Code
            attributes,
        );
    };

    // **** Event Handlers
    const handleSelectColor = (e: SelectChangeEvent) => {
        setColor(e.target.value as string);
    };

    const handleSelectSize = (e: SelectChangeEvent) => {
        setSize(e.target.value as string);
    };

    const handleUpdateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (quantity && product) {
            addToCart(product, parseInt(quantity, 10), { color, size });

            // Generate an mParticle Product Object before sending any eCommerce Events
            const mParticleProduct: mParticle.Product = getMPProduct(product);

            mParticle.eCommerce.logProductAction(
                mParticle.ProductActionType.AddToCart,
                mParticleProduct,
            );
            setToastVisible(true);
        }
    };

    useEffect(() => {
        // Look up product details from your 'Data Store'
        if (productId) {
            const selectedProduct = getProductById(productId);

            if (selectedProduct) {
                setProduct(selectedProduct);
            }
        }
    }, []);

    useEffect(() => {
        // Generates a Product View Detail Event to signal that a customer
        // viewed the product details, potentially leading to an 'Add to Cart' Event
        if (product) {
            // Generate an mParticle Product Object before sending any eCommerce Events
            const mParticleProduct: mParticle.Product = getMPProduct(product);

            // Fire a single eCommerce Product View Detail Event for this product page
            mParticle.eCommerce.logProductAction(
                mParticle.ProductActionType.ViewDetail,
                mParticleProduct,
            );
        }

        // If you re-render and the product changes,
        // this will re-fire a new Product View Detail Event
    }, [product]);

    useEffect(() => {
        // Listens for product, size or color change so that
        // the 'Add To Cart' Butten can be enabled/disabled
        // if the product has variants that have not been selected
        let isValid = true;

        if (product && product.variants) {
            isValid = true;
            if (product.variants.color && !color) {
                isValid = false;
            }
            if (product.variants.size && !size) {
                isValid = false;
            }
        }
        setFormValid(isValid);
    }, [product, size, color]);

    return (
        product && (
            <Page>
                <Grid
                    container
                    rowSpacing={2}
                    columnSpacing={{ xs: 2, sm: 4, md: 10 }}
                >
                    <Grid item xs={12}>
                        <BackButton />
                    </Grid>
                    <Grid item xs={12} sx={classes.mobileResponsive}>
                        <Box>
                            <Typography variant='h5'>
                                {product.label}
                            </Typography>
                            <Typography variant='body1'>
                                Item: {formatCurrency(product.price)}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box
                            component='img'
                            sx={{
                                minWidth: 343,
                                maxWidth: 566,
                                width: '100%',
                                height: 'auto',
                            }}
                            alt={product.altText}
                            src={process.env.PUBLIC_URL + product.imageUrl}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box sx={classes.desktopResponsive}>
                            <Box>
                                <Typography variant='h3' align='left'>
                                    {product.label}
                                </Typography>
                            </Box>
                        </Box>
                        <WrappedTypography
                            variant='body2'
                            text={product.description}
                            sx={{ my: 3 }}
                        />
                        <Box sx={classes.desktopResponsive}>
                            <Typography variant='body1' align='left'>
                                <strong>{formatCurrency(product.price)}</strong>
                            </Typography>
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    my: 3,
                                }}
                            >
                                {product.variants?.color && (
                                    <ProductVariantSelect
                                        id='color-select'
                                        label='Select Color'
                                        value={color}
                                        onChangeHandler={handleSelectColor}
                                        valueList={product.variants.color}
                                    />
                                )}

                                {product.variants?.size && (
                                    <ProductVariantSelect
                                        id='size-select'
                                        label='Select Size'
                                        value={size}
                                        onChangeHandler={handleSelectSize}
                                        valueList={product.variants?.size}
                                    />
                                )}

                                <FormControl sx={{ maxWidth: '120px' }}>
                                    <TextField
                                        id='quantity'
                                        label='Quantity'
                                        value={quantity}
                                        onChange={handleUpdateQuantity}
                                    />
                                </FormControl>
                            </Box>
                            <Button
                                variant='contained'
                                fullWidth
                                size='large'
                                type='submit'
                                disabled={!formValid}
                            >
                                Add to Cart
                            </Button>
                        </form>
                    </Grid>
                </Grid>
                <Snackbar
                    autoHideDuration={6000}
                    open={toastVisible}
                    message='Product added to cart'
                    action={
                        <Button component={Link} to='/cart'>
                            Go to Cart
                        </Button>
                    }
                    onClose={() => setToastVisible(false)}
                />
            </Page>
        )
    );
};

export default ProductDetailPage;
