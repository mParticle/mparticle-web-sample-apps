// TS incorrectly flags function declarations as unused variables
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useMemo, useState } from 'react';
import { Product } from '../models/Products';

interface OrderDetailsStore {
    items: CartItems;
    subTotal: number;
    salesTax: number;
    shippingCost: number;
    grandTotal: number;
    numberOfProducts: number;
    addToCart(
        product: Product,
        quantity: number,
        variants?: CartItemVariants,
    ): void;
    removeFromCart(cartId: string): void;
    resetCart(): void;
}

// use type assertion for initial empty state
const OrderDetails = createContext({} as OrderDetailsStore);

export function useOrderDetails() {
    const context = useContext(OrderDetails);

    if (!context) {
        throw new Error(
            'useOrderDetails must be used within an OrderDetailsProvider',
        );
    }

    return context;
}

export interface CartItem {
    product: Product;
    quantity: number;
    totalAmount: number;
    variants?: {
        color?: string;
        size?: string;
    };
}

export interface CartItems {
    [key: string]: CartItem;
}

interface CartItemVariants {
    color?: string;
    size?: string;
}

const OrderDetailsProvider: React.FC = ({ children }) => {
    const [items, setItems] = useState<CartItems>({});

    const [subTotal, setSubTotal] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [salesTax, setSalesTax] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);

    const [numberOfProducts, setNumberOfProducts] = useState(0);

    const value = useMemo(() => {
        const updateTotals = (_items: CartItems) => {
            let calcNumberOfProducts = 0;
            let calcSubTotal = 0;
            let calcShipping = 0;
            let calcGrandTotal = 0;
            let calcSalesTax = 0;
            Object.keys(_items).forEach((key) => {
                calcSubTotal += _items[key].totalAmount;

                // Using 15 % as an arbitrary shipping cost for example purposes
                calcShipping += _items[key].totalAmount * 0.15;
                calcNumberOfProducts += _items[key].quantity;
            });

            // Using 8.875% Sales Tax since we're in NYC.
            calcSalesTax = calcSubTotal * 0.08875;
            calcGrandTotal = calcSubTotal + calcShipping + calcSalesTax;

            setSubTotal(calcSubTotal);
            setSalesTax(calcSalesTax);
            setShippingCost(calcShipping);
            setGrandTotal(calcGrandTotal);
            setNumberOfProducts(calcNumberOfProducts);
        };

        const addToCart = (
            product: Product,
            quantity: number,
            variants?: CartItemVariants,
        ) => {
            const { id, price } = product;

            // Concat ID with Variants to allow duplicate items with variants
            const cartId: string =
                `${id}${variants?.color}${variants?.size}`.replace(/\s+/g, '');

            let newItem: CartItem = { ...items[cartId] };
            if (items[cartId]) {
                // Increment existing values if item is already in cart
                newItem.quantity += quantity;
                newItem.totalAmount += quantity * price;
            } else {
                // create new item in cart
                newItem = {
                    product,
                    totalAmount: quantity * price,
                    quantity,
                    variants,
                };
            }

            const newItems = {
                ...items,
                [cartId]: newItem,
            };

            setItems(newItems);

            updateTotals(newItems);
        };

        const removeFromCart = (cartId: string) => {
            const newItems = { ...items };
            delete newItems[cartId];

            setItems(newItems);
            updateTotals(newItems);
        };

        const resetCart = () => {
            setItems({});
            updateTotals({});
        };

        return {
            addToCart,
            removeFromCart,
            resetCart,
            items,
            subTotal,
            salesTax,
            shippingCost,
            grandTotal,
            numberOfProducts,
        };
    }, [items, subTotal, salesTax, shippingCost, grandTotal, numberOfProducts]);

    return (
        <OrderDetails.Provider value={value}>{children}</OrderDetails.Provider>
    );
};

export default OrderDetailsProvider;
