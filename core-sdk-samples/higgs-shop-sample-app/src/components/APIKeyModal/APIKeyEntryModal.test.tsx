import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import APIKeyEntryModal from './APIKeyEntryModal';

describe('API Key Entry Modal', () => {
    test('renders a modal with necessary UI elements', () => {
        render(<APIKeyEntryModal />);

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
            'https://github.com/mParticle/mparticle-web-sample-apps',
        );
        expect(keyTextField).toBeInTheDocument();
        expect(saveAndGoButton).toBeInTheDocument();
        expect(saveAndGoButton).toBeDisabled();
    });

    test('should enable Save & Go button if API Key is Entered', async () => {
        render(<APIKeyEntryModal />);

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

    test('should close only if API Key is entered', async () => {
        render(<APIKeyEntryModal />);

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
    });
});
