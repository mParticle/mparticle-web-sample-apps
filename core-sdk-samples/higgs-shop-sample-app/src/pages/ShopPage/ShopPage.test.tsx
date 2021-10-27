import { render, screen, waitFor } from '@testing-library/react';
import { within } from '@testing-library/dom';
import { MemoryRouter } from 'react-router-dom';
import mParticle from '@mparticle/web-sdk';
import { ShopPage } from '.';
import products from '../../models/Products';
import {
    mockCreateImpression,
    mockCreateProduct,
} from '../../test-utils/helpers';

describe('Shop Page', () => {
    test('render a list of products', () => {
        render(<ShopPage />, { wrapper: MemoryRouter });

        const { getByText } = within(screen.getByTestId('shop-product-list'));

        products.forEach((p) => {
            expect(getByText(p.label));
        });
    });

    test('fires an mParticle Page View', async () => {
        render(<ShopPage />, { wrapper: MemoryRouter });

        await waitFor(() => {
            expect(mParticle.logPageView).toHaveBeenCalledWith('Landing');
        });
    });

    test('creates mParticle Product for each product', async () => {
        render(<ShopPage />, { wrapper: MemoryRouter });
        await waitFor(() => {
            products.forEach((product) => {
                expect(mParticle.eCommerce.createProduct).toHaveBeenCalledWith(
                    product.label,
                    product.id,
                    product.price,
                );
            });
        });
    });

    test('creates an mParticle Impression', async () => {
        mockCreateProduct();

        render(<ShopPage />, { wrapper: MemoryRouter });

        await waitFor(() => {
            expect(mParticle.eCommerce.createImpression).toHaveBeenCalledWith(
                'Product List Impression',
                products.map((p) => ({
                    Name: p.label,
                    SKU: p.id,
                    Price: p.price,
                })),
            );
            expect(mParticle.eCommerce.createImpression).toHaveBeenCalledTimes(
                1,
            );
        });
    });

    test('fires mParticle Product Impression Event', async () => {
        mockCreateProduct();
        mockCreateImpression();

        render(<ShopPage />, { wrapper: MemoryRouter });
        await waitFor(() => {
            expect(mParticle.eCommerce.logImpression).toHaveBeenCalledWith({
                Name: 'Product List Impression',
                Product: products.map((p) => ({
                    Name: p.label,
                    SKU: p.id,
                    Price: p.price,
                })),
            });
            expect(mParticle.eCommerce.logImpression).toHaveBeenCalledTimes(1);
        });
    });
});
