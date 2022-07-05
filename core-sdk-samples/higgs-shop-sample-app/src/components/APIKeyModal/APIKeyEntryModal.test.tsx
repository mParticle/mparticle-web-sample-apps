import { screen, fireEvent, waitFor } from '@testing-library/react';
import { SAMPLE_APP_GITHUB_REPOSITORY_URL } from '../../constants';
import { renderWithAPIKeyContext } from '../../test-utils/helpers';
import APIKeyEntryModal from './APIKeyEntryModal';

describe('API Key Entry Modal', () => {
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
        renderWithAPIKeyContext(<APIKeyEntryModal isOpen />);

        const welcomeText = screen.getByText('Welcome to HiggsMart!');

        const githubRepoLink = screen.getByRole('link', {
            name: /learn/i,
        });

        const keyTextField = screen.getByRole('textbox', {
            name: /key/i,
        });

        const saveAndGoButton = screen.getByRole('button', {
            name: 'Save & Go',
        });

        expect(welcomeText).toBeInTheDocument();
        expect(githubRepoLink).toBeInTheDocument();
        expect(githubRepoLink).toHaveAttribute(
            'href',
            SAMPLE_APP_GITHUB_REPOSITORY_URL,
        );
        expect(keyTextField).toBeInTheDocument();
        expect(saveAndGoButton).toBeInTheDocument();
        expect(saveAndGoButton).toBeDisabled();
    });

    test('should allow an API Key as a parameter', () => {
        renderWithAPIKeyContext(
            <APIKeyEntryModal isOpen initialKey='XXXXXX' />,
        );

        const keyTextField = screen.getByRole('textbox', {
            name: /key/i,
        });

        expect(keyTextField).toHaveValue('XXXXXX');
    });

    test('should enable Save & Go button if API Key is Entered', async () => {
        renderWithAPIKeyContext(<APIKeyEntryModal isOpen />);

        const keyTextField = screen.getByRole('textbox', {
            name: /key/i,
        });

        const saveAndGoButton = screen.getByRole('button', {
            name: 'Save & Go',
        });

        expect(saveAndGoButton).toBeDisabled();

        fireEvent.change(keyTextField, { target: { value: 'XXXXXXXX' } });

        await waitFor(() => expect(saveAndGoButton).toBeEnabled());
    });

    test('should close only if API Key is entered and reload window', async () => {
        renderWithAPIKeyContext(<APIKeyEntryModal isOpen />);

        const keyTextField = screen.getByRole('textbox', {
            name: /key/i,
        });

        const saveAndGoButton = screen.getByRole('button', {
            name: 'Save & Go',
        });

        fireEvent.change(keyTextField, { target: { value: 'XXXXXXXX' } });
        fireEvent.click(saveAndGoButton);

        await waitFor(() =>
            expect(
                screen.queryByText('Welcome to HiggsMart!'),
            ).not.toBeVisible(),
        );
        await waitFor(() => expect(window.location.reload).toHaveBeenCalled());
    });
});
