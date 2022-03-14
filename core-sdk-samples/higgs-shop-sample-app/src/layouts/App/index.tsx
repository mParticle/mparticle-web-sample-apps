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
import UserDetailsProvider from '../../contexts/UserDetails';
import { AccountPage } from '../../pages/AccountPage';

const App = () => {
    const mParticleConfig: mParticle.MPConfiguration = {
        isDevelopmentMode: true,
        // logLevel can be 'verbose', 'warning', or 'none' (the default is 'warning').
        // This logLevel provides context into the inner workings of mParticle.
        // It can be updated after MP has been initialized using mParticle.setLogLevel().
        // and passing.  Logs will be available in the inspector.
        // More can be found at https://docs.mparticle.com/developers/sdk/web/custom-logger/
        logLevel: 'verbose',

        // This callback will be called when mParticle successfully initializes
        // and will return any known User Identities from mParticle.
        // You can then syncronize this user data with any services that are
        // unique to your application.
        // identityCallback: (result) => {
        //     if (result.getUser()) {
        //         // User has been identified
        //         // proceed with any custom logic that requires a valid, identified user
        //     } else {
        //         // the IDSync call failed
        //     }
        // },
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
                <UserDetailsProvider>
                    <OrderDetailsProvider>
                        <BrowserRouter>
                            <StartShoppingModal />
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
