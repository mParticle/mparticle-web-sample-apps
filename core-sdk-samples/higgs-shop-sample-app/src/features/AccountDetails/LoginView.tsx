// TS incorrectly flags function declarations as unused variables
/* eslint-disable no-unused-vars */
import {
    Button,
    FormControl,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface LoginViewProps {
    loginAction(userId: string): void;
}
const LoginView: React.FC<LoginViewProps> = ({ loginAction }) => {
    const [userId, setUserId] = useState('MyHiggsId');
    return (
        <>
            <Grid item>
                <FormControl>
                    <TextField
                        id='userId'
                        label='User Id'
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </FormControl>
            </Grid>
            <Grid item>
                <Button
                    variant='contained'
                    fullWidth
                    size='large'
                    onClick={() => loginAction(userId)}
                >
                    Sign in *
                </Button>
            </Grid>
            <Grid item>
                <Typography variant='caption'>* Demonstration Only</Typography>
            </Grid>
        </>
    );
};

export default LoginView;
