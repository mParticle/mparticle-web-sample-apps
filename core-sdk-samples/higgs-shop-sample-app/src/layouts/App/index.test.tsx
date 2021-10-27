import { render, waitFor } from '@testing-library/react';
import mParticle from '@mparticle/web-sdk';
import App from '.';

describe('mParticle Web Sample App', () => {
    test('should initialize the Web SDK', async () => {
        render(<App />);
        await waitFor(() => {
            expect(mParticle.init).toHaveBeenCalledWith('test_key', {
                isDevelopmentMode: true,
                logLevel: 'verbose',
            });
        });
    });
});
