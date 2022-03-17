// TS incorrectly flags function declarations as unused variables
/* eslint-disable no-unused-vars */
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';

interface AccountDetailsProps {
    username: string;
    logoutAction(): void;
}
const AccountDetails: React.FC<AccountDetailsProps> = ({
    username,
    logoutAction,
}) => {
    return (
        <>
            <Grid item>
                <Typography variant='h6'>You are signed in as</Typography>
            </Grid>
            <Grid
                item
                sx={{
                    mb: 2,
                }}
            >
                <Typography variant='body2'>{username}</Typography>
            </Grid>
            <Grid item>
                <Button
                    variant='contained'
                    fullWidth
                    size='large'
                    onClick={logoutAction}
                >
                    Sign Out *
                </Button>
            </Grid>
            <Grid item>
                <Typography variant='caption'>* Demonstration Only</Typography>
            </Grid>
        </>
    );
};
export default AccountDetails;
