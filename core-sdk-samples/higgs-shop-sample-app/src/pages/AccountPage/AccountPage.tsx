import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { Page } from '../../layouts/Page';
import { useUserDetails } from '../../contexts/UserDetails';
import { AccountDetails, LoginView } from '../../features/AccountDetails';

// This Page demonstrates mParticle's IDSync functionality.
// In this example, we are only using 'Login' and 'Logout' Identity Requests. To
// learn more about many of the other features, please visit our Doc Site:
// https://docs.mparticle.com/developers/sdk/web/idsync/

const { mParticle } = window;

const AccountPage = () => {
    // For demonstration purposes, our account page simply controls whether our
    // user has been logged in or not. In most cases, you would handle authentication
    // and security through other means, and then have mParticle integrated into that
    // process.
    // In our use case, we are simply using a React Context Provider to share logged in
    // and basic user states across the application
    const { user, isLoggedIn, login, logout } = useUserDetails();

    const handleLogIn = (username: string) => {
        // For our example, we are simulating an external login service
        // that simply returns a user object if the login was 'successful'
        // Our Sample App does not authenticate or authorize a user, and we
        // do not handle passwords.
        const myUser = login(username);

        const { email, customerid } = myUser;

        // Our Sample App uses mock data based on what is entered into the UI.
        // To demonstrate our configuration, we are explicitly declaring that
        // we are using a custom customer ID and email address to identify our
        // 'customer'. mParticle supports many other forms of identity to
        // identify users.
        // Visit our Docs for more details:
        // https://docs.mparticle.com/developers/sdk/web/idsync/#supported-identity-types
        const identityRequest: mParticle.IdentityApiData = {
            userIdentities: {
                email,
                customerid,
            },
        };

        const identityCallback: mParticle.IdentityCallback = (result) => {
            if (result.getUser()) {
                // Handle any necessary post-login actions
            }
        };

        mParticle.Identity.login(identityRequest, identityCallback);
    };

    const handleLogout = () => {
        const identityCallback: mParticle.IdentityCallback = (result) => {
            if (result.getUser()) {
                // Handle any necessary post-login actions
            }
        };

        // As we are logging out, we no longer need to pass any custom
        // User Identities. However, there may be use cases where you want
        // want to pass in identities.
        // For more examples:
        // https://docs.mparticle.com/developers/sdk/web/idsync/#login-and-logout
        mParticle.Identity.logout({}, identityCallback);

        // As an example, we are formally logging the user out seperately from
        // any mParticle logging actions
        logout();
    };

    const renderAccountView = () => {
        if (isLoggedIn && user) {
            return (
                <AccountDetails
                    username={user.username}
                    logoutAction={handleLogout}
                />
            );
        }
        return <LoginView loginAction={handleLogIn} />;
    };

    return (
        <Page>
            <Box
                sx={{
                    my: 5,
                }}
            >
                <Typography variant='h3'>My Account</Typography>
            </Box>
            <Grid
                container
                rowSpacing={2}
                columns={1}
                direction='column'
                alignItems='center'
                justifyContent='center'
                sx={{
                    my: 5,
                }}
            >
                {renderAccountView()}
            </Grid>
        </Page>
    );
};

export default AccountPage;
