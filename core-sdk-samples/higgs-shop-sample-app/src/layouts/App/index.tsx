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
import { MessageModal } from '../../components/MessageModal';
import { APIkeyModalMessage } from '../../constants';

const App = () => {
    const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);

    const mParticleConfig: mParticle.MPConfiguration = {
        isDevelopmentMode: true,
        // logLevel can be 'verbose', 'warning', or 'none' (the default is 'warning').
        // This logLevel provides context into the inner workings of mParticle.
        // It can be updated after MP has been initialized using mParticle.setLogLevel().
        // and passing.  Logs will be available in the inspector.
        // More can be found at https://docs.mparticle.com/developers/sdk/web/custom-logger/
        logLevel: 'verbose',
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
                                        target='_new'
                                        href='https://github.com/mParticle/mparticle-web-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/README.md'
                                    >
                                        Go to Readme
                                    </Button>
                                    <Button
                                        variant='contained'
                                        target='_new'
                                        href='https://docs.mparticle.com/developers/quickstart/senddata/#1-generate-your-api-key-2'
                                    >
                                        Go to Docs
                                    </Button>
                                </>
                            }
                        />
                        <NavigationMenu />
                        <Routes>
                            <Route path='/' element={<ShopPage />} />
                            <Route path='shop' element={<ShopPage />} />
                            <Route path='about' element={<AboutPage />} />
                            <Route path='cart' element={<CartPage />} />
                            <Route
                                path='/products/:id'
                                element={<ProductDetailPage />}
                            />
                        </Routes>
                    </BrowserRouter>
                </OrderDetailsProvider>
            </ThemeProvider>
        </div>
    );
};

export default App;
