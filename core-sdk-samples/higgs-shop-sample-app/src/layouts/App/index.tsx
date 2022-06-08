/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import mParticle from '@mparticle/web-sdk';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import { NavigationMenu } from '../../components/NavigationMenu';
import { ShopPage } from '../../pages/ShopPage';
import { AboutPage } from '../../pages/AboutPage';
import './index.css';
import theme from '../../contexts/theme';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { CartPage } from '../../pages/CartPage';
import { StartShoppingModal } from '../../components/StartShoppingModal';
import OrderDetailsProvider from '../../contexts/OrderDetails';
import UserDetailsProvider from '../../contexts/UserDetails';
import { AccountPage } from '../../pages/AccountPage';
import { MessageModal } from '../../components/MessageModal';
import { APIkeyModalMessage } from '../../constants';
import { APIKeyHeaderBar } from '../../components/APIKeyHeaderBar';
// TODO: Temporarily hidden until functionality is wired in
// import {
// APIKeyUpdateModal,
// APIKeyEntryModal,
// APIKeyRemoveConfirmationModal,
// } from '../../components/APIKeyModal';

// (optional) Use the package version number to keep your appVersion up-to-date
const { version } = require('../../../package.json');

const App = () => {
    const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);

    const mParticleConfig: mParticle.MPConfiguration = {
        // (optional) `appName and appVersion are used to associate with your web app
        // and are included in all event uploads
        appName: 'Higgs Shop',
        appVersion: version,

        // `package` is an optional analytics attribute that mParticle
        //  uses to measure usage and diagnostics of the Sample Apps.
        //  In a production application, you can safely remove this, or set
        //  it to your own value to help with diagnostics.
        package: 'com.mparticle.example.HiggsShopSampleApp',

        // Sets to Dev Mode
        isDevelopmentMode: true,

        // logLevel can be 'verbose', 'warning', or 'none' (the default is 'warning').
        // This logLevel provides context into the inner workings of mParticle.
        // It can be updated after MP has been initialized using mParticle.setLogLevel().
        // and passing.  Logs will be available in the inspector.
        // More can be found at https://docs.mparticle.com/developers/sdk/web/custom-logger/
        logLevel: 'verbose',

        // This callback will be called when mParticle successfully initializes
        // and will return any known User Identities from mParticle.
        // You can then synchronize this user data with any services that are
        // unique to your application.
        identityCallback: (result) => {
            if (result.getUser()) {
                // User has been identified
                // proceed with any custom logic that requires a valid, identified user

                const user = result.getUser();
                const { userIdentities } = user.getUserIdentities();

                // For demonstration purposes, we are printing out the known values for a user
                // to the console. An example of a use case for this callback might be to sync
                // the identity of a user with your own authentication logic
                Object.keys(userIdentities).forEach((identity) => {
                    console.log(
                        'User Identity Value: ',
                        identity,
                        userIdentities[
                            identity as keyof mParticle.UserIdentities
                        ],
                    );
                });
            } else {
                // the IDSync call failed
            }
        },
    };

    // this should be defined in .env the
    const apiKey = process.env.REACT_APP_MPARTICLE_API_KEY;

    useEffect(() => {
        if (apiKey) {
            mParticle.init(apiKey, mParticleConfig);
        } else {
            setApiKeyModalOpen(true);
            console.error('Please add your mParticle API Key');
        }
    }, []);

    return (
        <div className='App'>
            <ThemeProvider theme={theme}>
                <UserDetailsProvider>
                    <OrderDetailsProvider>
                        <BrowserRouter>
                            {/* Hide Shopping dialog if api key warning is visible */}
                            {!apiKeyModalOpen && <StartShoppingModal />}
                            <MessageModal
                                message={APIkeyModalMessage}
                                open={apiKeyModalOpen}
                                buttonAction={
                                    <>
                                        <Button
                                            variant='contained'
                                            target='_blank'
                                            href='https://github.com/mParticle/mparticle-web-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/README.md'
                                        >
                                            Go to Readme
                                        </Button>
                                        <Button
                                            variant='contained'
                                            target='_blank'
                                            href='https://docs.mparticle.com/developers/quickstart/senddata/#1-generate-your-api-key-2'
                                        >
                                            Go to Docs
                                        </Button>
                                    </>
                                }
                            />
                            <APIKeyHeaderBar />
                            {/* 
                            // TODO: Temporarily hidden until functionality is wired in
                            <APIKeyRemoveConfirmationModal />
                            <APIKeyEntryModal />
                            <APIKeyUpdateModal
                                currentApiKey={apiKey || '12345'}
                            /> */}
                            <NavigationMenu />
                            <Routes>
                                <Route path='/' element={<ShopPage />} />
                                <Route path='shop' element={<ShopPage />} />
                                <Route path='about' element={<AboutPage />} />
                                <Route
                                    path='account'
                                    element={<AccountPage />}
                                />
                                <Route path='cart' element={<CartPage />} />
                                <Route
                                    path='/products/:id'
                                    element={<ProductDetailPage />}
                                />
                            </Routes>
                        </BrowserRouter>
                    </OrderDetailsProvider>
                </UserDetailsProvider>
            </ThemeProvider>
        </div>
    );
};

export default App;
