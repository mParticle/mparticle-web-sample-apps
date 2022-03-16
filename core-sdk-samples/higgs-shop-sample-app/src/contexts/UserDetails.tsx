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
            // from a database. In our Sample App, we are simply hard-coding
            // user details for demonstration purposes
            const myUser: User = {
                username,
                email: 'higgs@mparticle.com',
                customerid: 'higgs123',
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
