import mParticle from '@mparticle/web-sdk';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import APIKeyContextProvider from '../contexts/APIKeyContext';
import OrderDetailsProvider from '../contexts/OrderDetails';

const updateQuantity = async (quantity: number) => {
    const quantityTextField = await screen.findByRole('textbox', {
        name: /quantity/i,
    });
    userEvent.clear(quantityTextField);
    userEvent.type(quantityTextField, `{selectall}${quantity}`);
};

export const addMugStickersToCart = async (quantity: number) => {
    const stickerCard = await screen.findByRole('link', {
        name: /mug sticker/i,
    });
    userEvent.click(stickerCard);

    await updateQuantity(quantity);

    const addToCartButton = screen.getByRole('button', {
        name: /add to cart/i,
    });
    userEvent.click(addToCartButton);
};

export const addPrideStickersToCart = async (quantity: number) => {
    const stickerCard = await screen.findByRole('link', {
        name: /pride sticker/i,
    });
    userEvent.click(stickerCard);

    await updateQuantity(quantity);

    const addToCartButton = screen.getByRole('button', {
        name: /add to cart/i,
    });
    userEvent.click(addToCartButton);
};

export const addHoodiesToCart = async (quantity: number) => {
    const hoodieCard = await screen.findByRole('link', {
        name: /mp icon full zip/i,
    });
    userEvent.click(hoodieCard);

    const colorSelect = await screen.findByRole('button', {
        name: /select color/i,
    });
    userEvent.click(colorSelect);

    const blackColorSelect = screen.getByRole('option', {
        name: /black/i,
    });
    userEvent.click(blackColorSelect);

    const sizeSelect = screen.getByRole('button', {
        name: /select size/i,
    });
    userEvent.click(sizeSelect);

    const xLSelect = screen.getByRole('option', {
        name: 'XL',
    });
    userEvent.click(xLSelect);

    await updateQuantity(quantity);

    const addToCartButton = screen.getByRole('button', {
        name: /add to cart/i,
    });
    userEvent.click(addToCartButton);
};

export const addFleecesToCart = async (quantity: number) => {
    const fleeceCard = await screen.findByRole('link', {
        name: /unisex fleece pullover/i,
    });
    userEvent.click(fleeceCard);

    const colorSelect = await screen.findByRole('button', {
        name: /select color/i,
    });
    userEvent.click(colorSelect);

    const deepBlackSelect = screen.getByRole('option', {
        name: /deep black/i,
    });
    userEvent.click(deepBlackSelect);

    const sizeSelect = screen.getByRole('button', {
        name: /select size/i,
    });
    userEvent.click(sizeSelect);

    const xxLSelect = screen.getByRole('option', {
        name: '2XL',
    });
    userEvent.click(xxLSelect);

    await updateQuantity(quantity);

    const addToCartButton = screen.getByRole('button', {
        name: /add to cart/i,
    });
    userEvent.click(addToCartButton);
};

interface RenderWithRouterProps {
    path: string;
    pathSignature: string;
    children?: React.ReactNode;
}
export const renderWithRouter = (
    element: ReactElement,
    props: RenderWithRouterProps,
) => {
    const { path, pathSignature, children } = props;
    render(
        <OrderDetailsProvider>
            <MemoryRouter initialEntries={[path]}>
                <Routes>
                    <Route path={pathSignature} element={element}>
                        {children}
                    </Route>
                </Routes>
            </MemoryRouter>
        </OrderDetailsProvider>,
    );
};

export const renderWithAPIKeyContext = (element: ReactElement) => {
    renderWithRouter(<APIKeyContextProvider>{element}</APIKeyContextProvider>, {
        path: '/',
        pathSignature: '/',
    });
};

export const mockCreateProduct = () => {
    const mp = mParticle.eCommerce.createProduct as jest.MockedFunction<any>;

    interface ProductResponse {
        Name: string;
        SKU: string;
        Price: number;
        Quantity?: number;
        TotalAmount?: number;
        Attributes?: mParticle.SDKEventAttrs;
    }

    mp.mockImplementation(
        (
            name: string,
            sku: string,
            price: number,
            quantity: number,
            variant: string,
            category: string,
            brand: string,
            position: number,
            coupon: number,
            attributes: mParticle.SDKEventAttrs,
        ) => {
            const response: ProductResponse = {
                Name: name,
                SKU: sku,
                Price: price,
                Quantity: quantity,

                // // Unused parameters need to be part of signature
                // // for mock implementation to work
                // Brand: brand,
                // category: variant,
                // Category: category,
                // Position: position,
                // CouponCode: couponCode,
            };

            if (attributes && Object.keys(attributes).length !== 0) {
                response.Attributes = attributes;
            }

            if (quantity) {
                response.Quantity = quantity;
                response.TotalAmount = quantity * price;
            }

            return response;
        },
    );
};

export const mockCreateImpression = () => {
    const mp = mParticle.eCommerce.createImpression as jest.MockedFunction<any>;

    mp.mockImplementation((name: string, _products: string[]) => ({
        Name: name,
        Product: _products,
    }));
};
