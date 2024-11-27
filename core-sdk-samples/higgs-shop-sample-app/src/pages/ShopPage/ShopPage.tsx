/* eslint-disable no-console */
import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import mParticle from '@mparticle/web-sdk';
import { Page } from '../../layouts/Page';
import { ProductList } from '../../features/ProductDetails';
import products from '../../models/Products';

const ShopPage = () => {
    // As per React conventions, it is recommended to trigger each mParticle
    // event in its own useEffect call.
    useEffect(() => {
        // To simulate a pageview with an SPA, we are triggering a
        // PageView whenever the Shop Page component is mounted.
        // In the case of this example application, our Shop Page
        // is our Landing page, so we are logging it as a "Landing"
        // Page View
        mParticle.logPageView('Landing');
    });

    useEffect(() => {
        // As our sample application represents a simple, streamlined use case,
        // we are simply using a single Product Impression to identify that a list of
        // products was viewed by the visitor. In most cases, you may have multiple
        // product lists within a single view. For example, Featured Products vs
        // Recommended or Related Products. Each of these would be considered a
        // separate list of products. You can also use a product impression event
        // for a single product as well.

        // First we convert our array of products to a array of mParticle products
        // so that your fields can be mapped to the necessary mParticle eCommerce
        // attributes
        // For more information, please review our Docs:
        // https://docs.mparticle.com/developers/sdk/web/commerce-tracking/#tracking-basic-purchases
        const mParticleProducts = products.map(({ label, id, price }) =>
            mParticle.eCommerce.createProduct(label, id, price),
        );

        // We then create a product impression
        const impressions = mParticle.eCommerce.createImpression(
            'Product List Impression',
            mParticleProducts,
        );

        // Then log the product impression
        mParticle.eCommerce.logImpression(impressions);
    });

    return (
        <Page>
            <Box
                sx={{
                    my: 5,
                }}
            >
                <Typography variant='h3'>Shop Rocket Surgery</Typography>
            </Box>
            <ProductList products={products} testId='shop-product-list' />
        </Page>
    );
};

export default ShopPage;
