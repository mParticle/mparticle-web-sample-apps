import { render, screen } from '@testing-library/react';
import APIKeyRemoveConfirmationModal from './APIKeyRemoveConfirmationModal';

describe('API Key Remove Confirmation Modal', () => {
    test('renders a modal with necessary UI elements', () => {
        render(<APIKeyRemoveConfirmationModal />);

        const headerText = screen.getByText('Are you sure?');

        const removeButton = screen.getByRole('button', {
            name: 'Remove key & reset app',
        });

        const backButton = screen.getByRole('button', {
            name: /back/i,
        });

        expect(headerText).toBeInTheDocument();
        expect(removeButton).toBeInTheDocument();
        expect(backButton).toBeInTheDocument();
    });
});
