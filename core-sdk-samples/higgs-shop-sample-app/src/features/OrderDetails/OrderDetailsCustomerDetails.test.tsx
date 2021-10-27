import { render, screen } from '@testing-library/react';
import OrderDetailsCustomerDetails from './OrderDetailsCustomerDetails';

describe('Order Details Customer Details', () => {
    test('should render shipping and payment details', () => {
        render(<OrderDetailsCustomerDetails />);
        const shippingHeaderTitle = screen.getByText(/shipping/i, {
            selector: 'h6',
        });
        expect(shippingHeaderTitle).toBeInTheDocument();

        const streetAddressField = screen.getByRole('textbox', {
            name: /street address/i,
        }) as HTMLInputElement;
        expect(streetAddressField).toBeInTheDocument();
        expect(streetAddressField).toBeDisabled();
        expect(streetAddressField.value).toBe('1234 Normal Lane');

        const cityAddressField = screen.getByRole('textbox', {
            name: /city/i,
        }) as HTMLInputElement;
        expect(cityAddressField).toBeInTheDocument();
        expect(cityAddressField).toBeDisabled();
        expect(cityAddressField.value).toBe('Higgsville');

        const stateAddressField = screen.getByRole('textbox', {
            name: /state/i,
        }) as HTMLInputElement;
        expect(stateAddressField).toBeInTheDocument();
        expect(stateAddressField).toBeDisabled();
        expect(stateAddressField.value).toBe('NY');

        const zipAddressField = screen.getByRole('textbox', {
            name: /zip/i,
        }) as HTMLInputElement;
        expect(zipAddressField).toBeInTheDocument();
        expect(zipAddressField).toBeDisabled();
        expect(zipAddressField.value).toBe('10010');

        const paymentHeaderTitle = screen.getByText(/payment/i, {
            selector: 'h6',
        });
        expect(paymentHeaderTitle).toBeInTheDocument();

        const creditCardField = screen.getByRole('textbox', {
            name: /credit card number/i,
        }) as HTMLInputElement;
        expect(creditCardField).toBeInTheDocument();
        expect(creditCardField).toBeDisabled();
        expect(creditCardField.value).toBe('0000-0000-0000');

        const expirationField = screen.getByRole('textbox', {
            name: /expiration/i,
        }) as HTMLInputElement;
        expect(expirationField).toBeInTheDocument();
        expect(expirationField).toBeDisabled();
        expect(expirationField.value).toBe('3/23');

        const cvcField = screen.getByRole('textbox', {
            name: /cvc/i,
        }) as HTMLInputElement;
        expect(cvcField).toBeInTheDocument();
        expect(cvcField).toBeDisabled();
        expect(cvcField.value).toBe('227');
    });
});
