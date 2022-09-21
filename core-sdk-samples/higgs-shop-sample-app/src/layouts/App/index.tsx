/* eslint-disable no-console */
// import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { NavigationMenu } from '../../components/NavigationMenu';
import { ShopPage } from '../../pages/ShopPage';
import { AboutPage } from '../../pages/AboutPage';
import './index.css';
import theme from '../../contexts/theme';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { CartPage } from '../../pages/CartPage';
import OrderDetailsProvider from '../../contexts/OrderDetails';
import UserDetailsProvider from '../../contexts/UserDetails';
import { AccountPage } from '../../pages/AccountPage';
import { APIKeyHeaderBar } from '../../components/APIKeyHeaderBar';
import { StartShoppingModal } from '../../components/StartShoppingModal';

const App = () => {
    return (
        <div className='App'>
            <ThemeProvider theme={theme}>
                <UserDetailsProvider>
                    <OrderDetailsProvider>
                        <HashRouter>
                            <StartShoppingModal />

                            <APIKeyHeaderBar />
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
                        </HashRouter>
                    </OrderDetailsProvider>
                </UserDetailsProvider>
            </ThemeProvider>
        </div>
    );
};

export default App;
