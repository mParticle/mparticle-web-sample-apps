import { render, screen } from '@testing-library/react';
import OrderDetailsTotals from './OrderDetailsTotals';

describe('Order Details Totals', () => {
    test('should render subtotals', () => {
        render(<OrderDetailsTotals subTotal={12.34} />);

        expect(
            screen.getByRole('heading', {
                name: 'Subtotal $12.34',
            }),
        ).toBeInTheDocument();
    });

    test('should render all totals', () => {
        render(
            <OrderDetailsTotals
                subTotal={42}
                salesTax={2.5}
                shippingCost={9.25}
                grandTotal={54.24}
            />,
        );

        expect(
            screen.getByRole('heading', {
                name: 'Subtotal $42.00',
            }),
        ).toBeInTheDocument();

        expect(
            screen.getByRole('heading', {
                name: 'Sales Tax $2.50',
            }),
        ).toBeInTheDocument();

        expect(
            screen.getByRole('heading', {
                name: 'Shipping $9.25',
            }),
        ).toBeInTheDocument();

        expect(
            screen.getByRole('heading', {
                name: 'Grand Total $54.24',
            }),
        ).toBeInTheDocument();
    });
});
