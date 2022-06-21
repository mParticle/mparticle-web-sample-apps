import { screen } from '@testing-library/react';
import { LOCAL_STORAGE_KEY } from '../../constants';
import { renderWithAPIKeyContext } from '../../test-utils/helpers';
import APIKeyHeaderBar from './APIKeyHeaderBar';

describe('API Key Header Bar', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV };

        window.localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify('test_key'),
        );
    });

    afterAll(() => {
        process.env = OLD_ENV;
        window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    });

    it('should have a valid UI Elements', () => {
        process.env.REACT_APP_HOSTED = 'true';

        renderWithAPIKeyContext(<APIKeyHeaderBar />);

        const welcomeText = screen.getByText(
            'You are viewing the mParticle Web Sample App',
        );

        const githubRepoLink = screen.getByRole('button', {
            name: /learn more/i,
        });

        const webKeyButton = screen.getByRole('button', {
            name: /web key/i,
        });

        expect(welcomeText).toBeInTheDocument();

        expect(webKeyButton).toBeInTheDocument();

        expect(githubRepoLink).toBeInTheDocument();

        expect(githubRepoLink).toHaveAttribute(
            'href',
            'https://github.com/mParticle/mparticle-web-sample-apps',
        );
    });

    it('should not only appear if hosted mode is not enabled', () => {
        process.env.REACT_APP_HOSTED = undefined;

        renderWithAPIKeyContext(<APIKeyHeaderBar />);

        const welcomeText = screen.queryByText(
            'You are viewing the mParticle Web Sample App',
        );

        expect(welcomeText).not.toBeInTheDocument();
    });
});
