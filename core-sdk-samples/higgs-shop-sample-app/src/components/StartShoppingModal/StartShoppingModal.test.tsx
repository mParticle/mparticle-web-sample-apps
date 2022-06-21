import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import mParticle from '@mparticle/web-sdk';
import StartShoppingModal from './StartShoppingModal';
import App from '../../layouts/App';
import { renderWithAPIKeyContext } from '../../test-utils/helpers';

describe('Start Shopping Modal', () => {
    beforeEach(() => {
        window.sessionStorage.clear();
    });

    test('should have a start shopping button', () => {
        renderWithAPIKeyContext(<StartShoppingModal />);

        const startShoppingButton = screen.getByRole('button', {
            name: /start shopping/i,
        });

        expect(startShoppingButton).toBeInTheDocument();
    });

    test('should not re-appear after button is clicked', () => {
        renderWithAPIKeyContext(<StartShoppingModal />);

        const startShoppingButton = screen.getByRole('button', {
            name: /start shopping/i,
        });

        fireEvent.click(startShoppingButton);

        expect(startShoppingButton).not.toBeVisible();

        renderWithAPIKeyContext(<StartShoppingModal />);

        expect(startShoppingButton).not.toBeVisible();
    });

    test('fires an mParticle Page View when it appears', () => {
        renderWithAPIKeyContext(<StartShoppingModal />);

        expect(mParticle.logPageView).toHaveBeenCalledWith('Landing');

        expect(mParticle.logPageView).toHaveBeenCalledTimes(1);
    });

    test('fires an mParticle custom event when button is clicked', () => {
        renderWithAPIKeyContext(<StartShoppingModal />);

        const startShoppingButton = screen.getByRole('button', {
            name: /start shopping/i,
        });

        fireEvent.click(startShoppingButton);
        expect(mParticle.logEvent).toHaveBeenCalledWith(
            'Landing Button Click',
            mParticle.EventType.Other,
        );
    });

    test('fires an mParticle custom event when modal background is clicked', async () => {
        // Background Click requires full app to render
        render(<App />);

        // Workaround for Mui. Overlay isn't easily targeted
        // through 'conventional' best practicess
        // and TypeScript will get mad since querySelect
        // can potentially return `null`
        const overlay = document.querySelector(
            '.MuiBackdrop-root',
        ) as unknown as Element;

        fireEvent.click(overlay);

        // Prevents test running for too long
        await waitFor(() => expect(overlay).not.toBeVisible());

        expect(mParticle.logEvent).toHaveBeenCalledWith(
            'Landing Modal Background Click',
            mParticle.EventType.Other,
        );
    });
});
