import { render, screen } from '@testing-library/react';
import APIKeyHeaderBar from './APIKeyHeaderBar';

describe('API Key Header Bar', () => {
    it('should have a valid UI Elements', () => {
        render(<APIKeyHeaderBar />);

        const welcomeText = screen.getByText(
            'You are viewing the mParticle Web Sample App',
        );

        const githubRepoLink = screen.getByRole('link', {
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
});
