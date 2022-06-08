import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import APIKeyUpdateModal from './APIKeyUpdateModal';

describe('API Key Update Modal', () => {
    test('renders a modal with necessary UI elements', () => {
        render(<APIKeyUpdateModal currentApiKey='XXXXX' />);

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
        expect(keyTextField).toHaveAttribute('value', 'XXXXX');
        expect(updateButton).toBeInTheDocument();
        expect(updateButton).toBeDisabled();
        expect(removeKeyButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
    });

    test('should enable Update button if API Key is Changed', async () => {
        render(<APIKeyUpdateModal currentApiKey='XXXXX' />);

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

    test('should close Cancel is clicked', async () => {
        render(<APIKeyUpdateModal currentApiKey='XXXXX' />);

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

    test('should close if API Key is updated', async () => {
        render(<APIKeyUpdateModal currentApiKey='XXXXX' />);

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
});
