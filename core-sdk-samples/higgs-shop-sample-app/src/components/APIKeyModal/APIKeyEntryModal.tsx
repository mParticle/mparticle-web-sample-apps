// TS incorrectly flags function declarations as unused variables
/* eslint-disable no-unused-vars */
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    Typography,
    Link,
    TextField,
    FormControl,
} from '@mui/material';
import React, { useState } from 'react';
import { HiggsLogo } from '../HiggsLogo';

interface APIKeyEntryModalProps {
    onSetAPIKey?(apiKey: string): void;
}

const APIKeyEntryModal: React.FC<APIKeyEntryModalProps> = ({ onSetAPIKey }) => {
    const [apiKey, setAPIKey] = useState('');
    const [open, setOpen] = useState(true);

    const closeModal = () => {
        setOpen(false);
    };

    const handleButtonClick = () => {
        if (onSetAPIKey) {
            onSetAPIKey(apiKey);
        }
        closeModal();
    };

    return (
        <Dialog open={open}>
            <Grid
                container
                columns={1}
                spacing={2}
                sx={{
                    width: '458px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    py: 6,
                    px: 3,
                    background:
                        'linear-gradient(180deg, #2C38A7 0%, #04071E 100%);',
                }}
            >
                <Grid item>
                    <Box
                        sx={{
                            width: 210,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Box sx={{ width: '90px' }}>
                            <HiggsLogo />
                        </Box>
                    </Box>
                </Grid>
                <Grid item>
                    <Typography variant='h4'>Welcome to HiggsMart!</Typography>
                </Grid>
                <Grid item>
                    <DialogContent>
                        <Typography variant='body1' align='center'>
                            Higgsmart is mParticle’s e-commerce sample app.
                            Everything here is connected to the SDK. Use this
                            app to test drive mParticle and understand how we
                            capture events.
                        </Typography>
                        <Typography variant='body1' align='center'>
                            <Link
                                href='https://github.com/mParticle/mparticle-web-sample-apps'
                                target='_blank'
                            >
                                Learn more at the Git Repo
                            </Link>
                        </Typography>
                    </DialogContent>
                </Grid>
                <Grid item>
                    <DialogContent>
                        <Typography variant='body1' align='center'>
                            To get started, add the web key you generated in
                            mParticle to connect this sample app to your
                            account.
                        </Typography>
                    </DialogContent>
                </Grid>
                <Grid item xs={12} sx={{ width: '100%' }}>
                    <DialogContent>
                        <FormControl fullWidth focused required>
                            <TextField
                                id='apiKey'
                                label='Key'
                                placeholder='Paste your Key here'
                                onChange={(e) => setAPIKey(e.target.value)}
                            />
                        </FormControl>
                    </DialogContent>
                </Grid>
                <Grid item>
                    <DialogActions>
                        <Button
                            disabled={!apiKey}
                            variant='contained'
                            onClick={handleButtonClick}
                            size='large'
                        >
                            Save &amp; Go
                        </Button>
                    </DialogActions>
                </Grid>
            </Grid>
        </Dialog>
    );
};

APIKeyEntryModal.defaultProps = {
    onSetAPIKey: undefined,
};

export default APIKeyEntryModal;
