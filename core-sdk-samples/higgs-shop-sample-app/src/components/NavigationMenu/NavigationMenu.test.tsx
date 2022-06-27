import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { NavigationMenu } from '.';

describe('Navigation Menu', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV };
    });

    afterAll(() => {
        process.env = OLD_ENV;
    });

    test('renders a desktop navigation Menu', () => {
        render(<NavigationMenu />, { wrapper: MemoryRouter });

        expect(
            screen.getByTestId('desktop-nav-shop-button'),
        ).toBeInTheDocument();

        // Temporarily hidden. We want this to be checked once it has been added back
        expect(
            screen.queryByTestId('desktop-nav-about-button'),
        ).not.toBeInTheDocument();

        expect(
            screen.getByTestId('desktop-nav-home-button'),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('desktop-nav-account-button'),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('desktop-nav-cart-button'),
        ).toBeInTheDocument();
    });

    // We are not actually testing if the mobile responsive
    // media queries are working. We just want to verify that
    // all necessary mobile navigation menu items are properly
    // loading in case they ever are accidentally removed
    test('renders a mobile navigation Menu', () => {
        render(<NavigationMenu />, { wrapper: MemoryRouter });

        expect(
            screen.getByTestId('mobile-nav-hamburger-button'),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('mobile-nav-home-button'),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('mobile-nav-cart-button'),
        ).toBeInTheDocument();
    });

    test('toggles drawer menu', async () => {
        render(<NavigationMenu />, { wrapper: MemoryRouter });

        const hamburgerButton = screen.getByTestId(
            'mobile-nav-hamburger-button',
        );

        expect(screen.queryByTestId('drawer-menu')).toBeNull();
        expect(screen.queryByTestId('drawer-nav-shop-button')).toBeNull();
        expect(screen.queryByTestId('drawer-nav-about-button')).toBeNull();
        expect(screen.queryByTestId('drawer-nav-account-button')).toBeNull();
        expect(screen.queryByTestId('drawer-nav-cart-button')).toBeNull();

        expect(hamburgerButton).toBeInTheDocument();
        await fireEvent.click(hamburgerButton);

        expect(screen.getByTestId('drawer-menu')).toBeVisible();
        expect(screen.getByTestId('drawer-nav-shop-button')).toBeVisible();
        expect(screen.getByTestId('drawer-nav-account-button')).toBeVisible();

        // Temporarily hidden. We want this to be checked once it has been added back
        expect(
            screen.queryByTestId('drawer-nav-about-button'),
        ).not.toBeInTheDocument();
        expect(screen.getByTestId('drawer-nav-cart-button')).toBeVisible();
    });

    test('renders api key UI Elements', async () => {
        render(<NavigationMenu />, { wrapper: MemoryRouter });

        process.env.REACT_APP_HOSTED = 'true';

        const hamburgerButton = screen.getByTestId(
            'mobile-nav-hamburger-button',
        );

        await fireEvent.click(hamburgerButton);

        const githubRepoLink = screen.getByRole('menuitem', {
            name: /go to github repo/i,
        });

        const webKeyButton = screen.getByRole('menuitem', {
            name: /web key/i,
        });

        expect(webKeyButton).toBeInTheDocument();

        expect(githubRepoLink).toBeInTheDocument();

        expect(githubRepoLink).toHaveAttribute(
            'href',
            'https://github.com/mParticle/mparticle-web-sample-apps',
        );
    });
});
