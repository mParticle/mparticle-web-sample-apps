import React from 'react';
import { Grid } from '@mui/material';
import { ProductCard } from '.';
import { Product } from '../../models/Products';

interface ProductListProps {
    products: Product[];
    testId: string;
}

const ProductList: React.FC<ProductListProps> = ({ testId, products }) => {
    return (
        <Grid
            data-testid={testId}
            container
            spacing={{ xs: 1, sm: 2 }}
            columns={{ xs: 1, sm: 2 }}
            direction='row'
            alignItems='center'
            justifyContent={{ xs: 'center', sm: 'flex-start' }}
        >
            {products.map(({ id, label, imageUrl, altText }) => (
                <Grid item key={id} xs={1} md={1}>
                    <ProductCard
                        testId={`${testId}-${id}`}
                        id={id}
                        key={id}
                        label={label}
                        imageUrl={imageUrl}
                        altText={altText}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;
