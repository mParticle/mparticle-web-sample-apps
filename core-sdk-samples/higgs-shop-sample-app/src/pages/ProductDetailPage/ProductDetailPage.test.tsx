import { screen, waitFor } from '@testing-library/react';
import mParticle from '@mparticle/web-sdk';
import userEvent from '@testing-library/user-event';
import { ProductDetailPage } from '.';
import { mockCreateProduct, renderWithRouter } from '../../test-utils/helpers';

describe('Product Page', () => {
    test('should have valid page elements', () => {
        renderWithRouter(<ProductDetailPage />, {
            path: '/products/128740',
            pathSignature: '/products/:id',
        });

        const headerTitle = screen.getByText(/mp icon full zip/i, {
            selector: 'h3',
        });

        const description = screen.getByText((content) =>
            content.startsWith('Really comfortable'),
        );

        const price = screen.getByText('$110.00');

        const colorMenu = screen.getByRole('button', {
            name: /select color/i,
        });

        const sizeMenu = screen.getByRole('button', {
            name: /select size/i,
        });

        const quantityTextField = screen.getByRole('textbox', {
            name: /quantity/i,
        });

        const productImage = screen.getByAltText(/mp icon full zip/i);

        const addToCartButton = screen.getByRole('button', {
            name: /add to cart/i,
        });

        expect(headerTitle).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(colorMenu).toBeInTheDocument();
        expect(sizeMenu).toBeInTheDocument();
        expect(quantityTextField).toBeInTheDocument();
        expect(productImage).toHaveAttribute('src', '/products/128740.png');
        expect(addToCartButton).toBeInTheDocument();
    });

    test('should have an enabled AddToCart Button for products without variants', () => {
        renderWithRouter(<ProductDetailPage />, {
            path: '/products/128114',
            pathSignature: '/products/:id',
        });

        const addToCartButton = screen.getByRole('button', {
            name: /add to cart/i,
        });
        expect(addToCartButton).toBeEnabled();
    });

    test('should have a disabled Add ToCart Button for products with variants', () => {
        renderWithRouter(<ProductDetailPage />, {
            path: '/products/128745',
            pathSignature: '/products/:id',
        });

        const addToCartButton = screen.getByRole('button', {
            name: /add to cart/i,
        });
        expect(addToCartButton).toBeDisabled();
    });

    test('should display toast message when product is added to cart', async () => {
        renderWithRouter(<ProductDetailPage />, {
            path: '/products/128745',
            pathSignature: '/products/:id',
        });

        const addToCartButton = screen.getByRole('button', {
            name: /add to cart/i,
        });
        expect(addToCartButton).toBeDisabled();

        const colorSelect = screen.getByRole('button', {
            name: /select color/i,
        });

        await userEvent.click(colorSelect);

        const mustardSelect = await screen.findByRole('option', {
            name: /mustard/i,
        });

        await userEvent.click(mustardSelect);

        const sizeSelect = await screen.findByRole('button', {
            name: /select size/i,
        });

        await userEvent.click(sizeSelect);

        const xLSelect = await screen.findByRole('option', {
            name: 'XL',
        });

        await userEvent.click(xLSelect);

        expect(addToCartButton).toBeEnabled();
        await userEvent.click(addToCartButton);

        const toastMessage = screen.getByText('Product added to cart');

        expect(toastMessage).toBeVisible();
        expect(toastMessage).toBeInTheDocument();
    });

    test('fires mParticle Product Detail View', async () => {
        mockCreateProduct();

        renderWithRouter(<ProductDetailPage />, {
            path: '/products/128740',
            pathSignature: '/products/:id',
        });

        await waitFor(() => {
            expect(mParticle.eCommerce.logProductAction).toHaveBeenCalledWith(
                mParticle.ProductActionType.ViewDetail,
                {
                    Name: 'mP Icon Full Zip',
                    SKU: '128740',
                    Price: 110,
                    Quantity: 1,
                    TotalAmount: 110,
                },
            );
            expect(mParticle.eCommerce.logProductAction).toHaveBeenCalledTimes(
                1,
            );
        });
    });

    test('fires mParticle Add to Cart Event', async () => {
        mockCreateProduct();

        renderWithRouter(<ProductDetailPage />, {
            path: '/products/128745',
            pathSignature: '/products/:id',
        });

        const addToCartButton = await screen.findByRole('button', {
            name: /add to cart/i,
        });

        const colorSelect = await screen.findByRole('button', {
            name: /select color/i,
        });
        await userEvent.click(colorSelect);

        const mustardSelect = await screen.findByRole('option', {
            name: /mustard/i,
        });
        await userEvent.click(mustardSelect);

        const sizeSelect = await screen.findByRole('button', {
            name: /select size/i,
        });
        await userEvent.click(sizeSelect);

        const xLSelect = await screen.findByRole('option', {
            name: 'XL',
        });
        await userEvent.click(xLSelect);

        const quantityTextField = await screen.findByRole('textbox', {
            name: /quantity/i,
        });

        await userEvent.clear(quantityTextField);
        await userEvent.type(quantityTextField, '{selectall}3');

        await userEvent.click(addToCartButton);

        await waitFor(() => {
            expect(mParticle.eCommerce.logProductAction).toHaveBeenCalledWith(
                mParticle.ProductActionType.AddToCart,
                {
                    Name: 'Unisex Full Logo Tee',
                    SKU: '128745',
                    Price: 9,
                    Quantity: 3,
                    TotalAmount: 27,
                    Attributes: {
                        color: 'Mustard',
                        size: 'XL',
                    },
                },
            );
        });
    });
});
