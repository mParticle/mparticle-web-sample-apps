// TS incorrectly flags function declarations as unused variables
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useMemo, useState } from 'react';

interface User {
    username: string;
    email: string;
    customerid: string;
}

interface UserDetailsStore {
    user: User | null;
    isLoggedIn: boolean;
    login(username: string): User;
    logout(): void;
}

// use type assertion for initial empty state
const UserDetails = createContext({} as UserDetailsStore);

// Helper function to generate a fake UUID
function generateUUID() {
    let d = new Date().getTime();
    let d2 =
        (typeof performance !== 'undefined' &&
            performance.now &&
            performance.now() * 1000) ||
        0; // Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16; // random number between 0 and 16
        if (d > 0) {
            // Use timestamp until depleted
            r = (d + r) % 16 || 0;
            d = Math.floor(d / 16);
        } else {
            // Use microseconds since page-load if supported
            r = (d2 + r) % 16 || 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r && 0x3) || 0x8).toString(16);
    });
}

export function useUserDetails() {
    const context = useContext(UserDetails);

    if (!context) {
        throw new Error(
            'useUserDetails must be used within a UserDetailsProvider',
        );
    }

    return context;
}

const UserDetailsProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const value = useMemo(() => {
        const login = (username: string) => {
            // In a real-world application, the user record would be pulled
            // from a database. In our Sample App, we are simply appending
            // an email address to the user ID.
            const myUser: User = {
                username,
                email: `${username}@email.com`,
                customerid: generateUUID(),
            };

            setUser(myUser);
            setLoggedIn(true);

            return myUser;
        };

        const logout = () => {
            setUser(null);
            setLoggedIn(false);
        };

        return {
            login,
            logout,
            user,
            isLoggedIn: loggedIn,
        };
    }, [user, loggedIn]);

    return (
        <UserDetails.Provider value={value}>{children}</UserDetails.Provider>
    );
};

export default UserDetailsProvider;
