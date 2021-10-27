/* eslint-disable no-console */
import { useEffect } from 'react';
import mParticle from '@mparticle/web-sdk';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { NavigationMenu } from '../../components/NavigationMenu';
import { ShopPage } from '../../pages/ShopPage';
import { AboutPage } from '../../pages/AboutPage';
import './index.css';
import theme from '../../contexts/theme';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { CartPage } from '../../pages/CartPage';
import { StartShoppingModal } from '../../components/StartShoppingModal';
import OrderDetailsProvider from '../../contexts/OrderDetails';

const App = () => {
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
            console.error('Please add your mParticle API Key');
        }
    });

    return (
        <div className='App'>
            <ThemeProvider theme={theme}>
                <OrderDetailsProvider>
                    <BrowserRouter>
                        <StartShoppingModal />
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
