import React, { useEffect, useState } from 'react';
import { Snackbar } from '@mui/material';
import { Page } from '../../layouts/Page';
import { useOrderDetails } from '../../contexts/OrderDetails';
import {
    OrderDetailsCartView,
    OrderDetailsEmpty,
    OrderDetailsPurchaseConfirmation,
} from '../../features/OrderDetails';
import { ORDER_PHASES, OrderPhaseTypes } from '../../constants';

// To simulate a purchase, we establish four "phases" of the order process
// - Default: Cart is empty, no need for a phase state
// - In Progress: Cart has items and user is adding things to the cart
// - Review: Cart has items and user has checked out their cart
// - Complete: User has completed a purchase and the cart has been emptied
// Completing an order should reset the items list, and reset the order phase to 'in progress'

const { mParticle } = window;

const CartPage: React.FC = () => {
    // Extract cart state from Context Provider
    // so that we can render the cart items and totals
    // as the cart page changes 'phases' depending on the
    // checkout process
    const { items, subTotal, numberOfProducts } = useOrderDetails();

    const [toastVisible, setToastVisible] = useState(false);
    const [orderPhase, setOrderPhase] = useState<OrderPhaseTypes>(
        ORDER_PHASES.IN_PROGRESS,
    );

    useEffect(() => {
        // Renders an initial cart view once when the page loads
        mParticle.logPageView('View My Cart', {
            number_of_products: numberOfProducts,
            total_product_amounts: subTotal,
        });
    }, []);

    useEffect(() => {
        // Listen for order phase to be complete so we can trigger
        // the "Thank You" toast message
        if (orderPhase === ORDER_PHASES.COMPLETE) {
            setToastVisible(true);
        }
    }, [orderPhase]);

    const renderOrderPhase = (phase: OrderPhaseTypes) => {
        // Cart is empty, render a message
        if (Object.keys(items).length === 0) return <OrderDetailsEmpty />;

        switch (phase) {
            case ORDER_PHASES.IN_PROGRESS:
                return <OrderDetailsCartView setOrderPhase={setOrderPhase} />;
            case ORDER_PHASES.REVIEW:
                return (
                    <OrderDetailsPurchaseConfirmation
                        setOrderPhase={setOrderPhase}
                    />
                );
            case ORDER_PHASES.COMPLETE:
                setOrderPhase(ORDER_PHASES.IN_PROGRESS);
                break;
            default:
                break;
        }
        return <OrderDetailsEmpty />;
    };

    return (
        <Page>
            {renderOrderPhase(orderPhase)}
            <Snackbar
                autoHideDuration={6000}
                open={toastVisible}
                message='Thank you for your order!'
                onClose={() => setToastVisible(false)}
            />
        </Page>
    );
};

export default CartPage;
