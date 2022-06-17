import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import APIKeyContextProvider from '../../contexts/APIKeyContext';
import APIKeyUpdateModal from './APIKeyUpdateModal';

describe('API Key Update Modal', () => {
    const originalWinLocation = window.location;

    // Mock window location since update modal resets window
    beforeAll(() => {
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: { reload: jest.fn() },
        });
    });

    // Unmock window location
    afterAll(() => {
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: originalWinLocation,
        });
    });

    test('renders a modal with necessary UI elements', () => {
        render(
            <APIKeyContextProvider>
                <APIKeyUpdateModal isOpen />
            </APIKeyContextProvider>,
        );

        const header = screen.queryByText('Web Key');

        const githubRepoLink = screen.getByRole('link', {
            name: /learn how/i,
        });

        const keyTextField = screen.getByRole('textbox', {
            name: /key/i,
        });

        const updateButton = screen.getByRole('button', {
            name: /update/i,
        });

        const removeKeyButton = screen.getByRole('button', {
            name: /remove key/i,
        });

        const cancelButton = screen.getByRole('button', {
            name: /cancel/i,
        });

        expect(header).toBeInTheDocument();
        expect(githubRepoLink).toBeInTheDocument();
        expect(githubRepoLink).toHaveAttribute(
            'href',
            'https://docs.mparticle.com/guides/getting-started/create-an-input/#create-access-credentials',
        );
        expect(keyTextField).toBeInTheDocument();
        expect(keyTextField).toHaveAttribute('value', 'test_key');
        expect(updateButton).toBeInTheDocument();
        expect(updateButton).toBeDisabled();
        expect(removeKeyButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
    });

    test('should enable Update button if API Key is Changed', async () => {
        render(
            <APIKeyContextProvider>
                <APIKeyUpdateModal isOpen />
            </APIKeyContextProvider>,
        );

        const keyTextField = screen.getByRole('textbox', {
            name: /key/i,
        });

        const updateButton = screen.getByRole('button', {
            name: 'Update',
        });

        expect(updateButton).toBeDisabled();

        fireEvent.change(keyTextField, { target: { value: 'XXXXXXXX' } });

        await waitFor(() => expect(updateButton).toBeEnabled());
    });

    test('should close when Cancel is clicked', async () => {
        render(
            <APIKeyContextProvider>
                <APIKeyUpdateModal isOpen />
            </APIKeyContextProvider>,
        );

        expect(screen.queryByText('Web Key')).toBeInTheDocument();

        const keyTextField = screen.getByRole('textbox', {
            name: /key/i,
        });

        const updateButton = screen.getByRole('button', {
            name: /update/i,
        });

        fireEvent.change(keyTextField, { target: { value: 'XXXXXXXX' } });
        fireEvent.click(updateButton);

        await waitFor(() =>
            expect(screen.queryByText('Web Key')).not.toBeVisible(),
        );
    });

    test('should close when API Key is updated', async () => {
        render(
            <APIKeyContextProvider>
                <APIKeyUpdateModal isOpen />
            </APIKeyContextProvider>,
        );

        const keyTextField = screen.getByRole('textbox', {
            name: /key/i,
        });

        const updateButton = screen.getByRole('button', {
            name: 'Update',
        });

        expect(updateButton).toBeDisabled();

        fireEvent.change(keyTextField, { target: { value: 'YYYYYYYYY' } });

        await waitFor(() => expect(updateButton).toBeEnabled());

        fireEvent.click(updateButton);

        await waitFor(() =>
            expect(screen.queryByText('Web Key')).not.toBeVisible(),
        );
    });

    test('should reload window when API Key is updated', async () => {
        render(
            <APIKeyContextProvider>
                <APIKeyUpdateModal isOpen />
            </APIKeyContextProvider>,
        );

        const keyTextField = screen.getByRole('textbox', {
            name: /key/i,
        });

        const updateButton = screen.getByRole('button', {
            name: 'Update',
        });

        fireEvent.change(keyTextField, { target: { value: 'YYYYYYYYY' } });

        await waitFor(() => expect(updateButton).toBeEnabled());

        fireEvent.click(updateButton);

        await waitFor(() => expect(window.location.reload).toHaveBeenCalled());
    });
});
