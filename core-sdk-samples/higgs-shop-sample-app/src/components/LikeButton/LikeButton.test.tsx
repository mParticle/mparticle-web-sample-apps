import { fireEvent, render, screen } from '@testing-library/react';
import mParticle from '@mparticle/web-sdk';
import { LikeButton } from '.';

describe('LikeButton', () => {
    test('renders a social media button', async () => {
        render(<LikeButton />);
        const socialMediaButton = screen.getByRole('button', { name: /Like/i });
        expect(socialMediaButton).toBeInTheDocument();
    });

    test('social media button toggles', async () => {
        render(<LikeButton />);
        const socialMediaButton = screen.getByRole('button', { name: /Like/i });

        await fireEvent.click(socialMediaButton);
        expect(socialMediaButton).toHaveTextContent('Unlike');

        await fireEvent.click(socialMediaButton);
        expect(socialMediaButton).toHaveTextContent('Like');
    });

    test('social media button fires a custom mParticle Event', async () => {
        render(<LikeButton />);
        const socialMediaButton = screen.getByRole('button', { name: /Like/i });

        await fireEvent.click(socialMediaButton);
        expect(mParticle.logEvent).toHaveBeenLastCalledWith(
            'Higgs Like',
            mParticle.EventType.Social,
        );

        await fireEvent.click(socialMediaButton);
        expect(mParticle.logEvent).toHaveBeenLastCalledWith(
            'Higgs Unlike',
            mParticle.EventType.Social,
        );
    });
});
