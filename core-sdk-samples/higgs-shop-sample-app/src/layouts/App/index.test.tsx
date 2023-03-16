import { render, waitFor } from '@testing-library/react';
import mParticle from '@mparticle/web-sdk';
import App from '.';

const { version } = require('../../../package.json');

describe('mParticle Web Sample App', () => {
    test('should initialize the Web SDK', async () => {
        render(<App />);
        await waitFor(() => {
            expect(mParticle.init).toHaveBeenCalledWith('test_key', {
                appName: 'Higgs Shop',
                appVersion: version,
                package: 'com.mparticle.example.HiggsShopSampleApp',
                isDevelopmentMode: true,
                logLevel: 'verbose',
                identityCallback: expect.any(Function),
                sideloadedKits: expect.any(Array),
            });
        });
    });
});
