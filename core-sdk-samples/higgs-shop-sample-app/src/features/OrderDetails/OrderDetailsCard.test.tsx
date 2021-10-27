import { render, screen } from '@testing-library/react';
import { Button } from '@mui/material';
import OrderDetailsCard from './OrderDetailsCard';

describe('Order Details Card', () => {
    test('renders a basic cart card', () => {
        render(
            <OrderDetailsCard
                productAttributes={{
                    id: '128272',
                    sku: '128272',
                    label: "Woman's Full Logo Tee",
                    imageUrl: '/path/to/image',
                    altText: "Woman's Full Logo Tee",
                    quantity: 3,
                    price: 9,
                    total: 27,
                }}
            />,
        );
        expect(
            screen.getByRole('heading', {
                name: "Woman's Full Logo Tee $27.00",
            }),
        ).toBeInTheDocument();

        expect(screen.getByText('Qty: 3')).toBeInTheDocument();
    });

    test('renders a full cart card', () => {
        render(
            <OrderDetailsCard
                productAttributes={{
                    id: '128272',
                    sku: '128272',
                    label: "Woman's Full Logo Tee",
                    imageUrl: '/path/to/image',
                    altText: "Woman's Full Logo Tee",
                    quantity: 3,
                    price: 9,
                    total: 27,
                    size: 'M',
                    color: 'Storm',
                }}
                buttonAction={<Button>Remove</Button>}
            />,
        );
        expect(
            screen.getByRole('heading', {
                name: "Woman's Full Logo Tee $27.00",
            }),
        ).toBeInTheDocument();

        expect(screen.getByText('Qty: 3')).toBeInTheDocument();
        expect(screen.getByText('Color: Storm')).toBeInTheDocument();
        expect(screen.getByText('Size: M')).toBeInTheDocument();

        expect(
            screen.getByRole('button', {
                name: /remove/i,
            }),
        ).toBeInTheDocument();
    });

    test('optionally renders a Button Action', () => {
        render(
            <OrderDetailsCard
                productAttributes={{
                    id: '128272',
                    sku: '128272',
                    label: "Woman's Full Logo Tee",
                    imageUrl: '/path/to/image',
                    altText: "Woman's Full Logo Tee",
                    quantity: 3,
                    price: 9,
                    total: 27,
                    size: 'M',
                    color: 'Storm',
                }}
            />,
        );

        expect(
            screen.queryByRole('button', {
                name: /remove/i,
            }),
        ).not.toBeInTheDocument();
    });
});
