/**
 * Sample App UI Component
 *
 * The the code in this file is purely for Sample App functionality and presentation
 * and does not in any way reflect how mParticle actually works in a production or
 * 'real world' application
 */

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
import React, { useEffect, useState } from 'react';
import { HiggsLogo } from '../HiggsLogo';
import { useAPIKeyContext } from '../../contexts/APIKeyContext';
import { MODAL_MODES } from '../../constants';

interface APIKeyUpdateModalProps {
    isOpen?: boolean;
}

const APIKeyUpdateModal: React.FC<APIKeyUpdateModalProps> = ({ isOpen }) => {
    const {
        // Change attributes to provide more clarity
        apiKey: globalAPIKey,
        setAPIKey: setGlobalAPIKey,
        setModalMode,
    } = useAPIKeyContext();

    const [tempAPIKey, setTempAPIKey] = useState(globalAPIKey);
    const [open, setOpen] = useState(false);
    const [canUpdateAPIKey, setCanUpdateAPIKey] = useState(false);

    const closeModal = () => {
        setModalMode(MODAL_MODES.CLOSED);
        setOpen(false);
    };

    const handleAPIKeyUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Checks if the Update Button should be enabled by comparing the
        // component level `tempAPIKey` with the application's `apiKey`
        // If they match, then the api key has not changed and should not be
        // updated
        setTempAPIKey(e.target.value);
        if (e.target.value === '' || e.target.value === globalAPIKey) {
            setCanUpdateAPIKey(false);
        } else {
            setCanUpdateAPIKey(true);
        }
    };

    const handleUpdateClick = () => {
        // Closes the modal only if api key has been updated
        // Button will be disabled if api key has not changed
        if (tempAPIKey) {
            setGlobalAPIKey(tempAPIKey);
            closeModal();
        }
    };

    useEffect(() => {
        // Reset the api key in the ui component back to whatever is currently in
        // the application state
        setTempAPIKey(globalAPIKey);
        setCanUpdateAPIKey(false);
    }, [open]);

    useEffect(() => {
        // Listens for the `isOpen` state to make sure
        // component stays closed when it isn't needed
        setOpen(isOpen || false);
    }, [isOpen]);

    return (
        <Dialog open={open}>
            <Grid
                container
                columns={1}
                spacing={2}
                sx={{
                    width: '458px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
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
                    <Typography variant='h4'>Web Key</Typography>
                </Grid>
                <Grid item>
                    <DialogContent>
                        <Typography variant='body1' align='center'>
                            The web key should be generated in mParticle in
                            order to connect this sample app to your account.{' '}
                            <Link
                                href='https://docs.mparticle.com/guides/getting-started/create-an-input/#create-access-credentials'
                                target='_blank'
                            >
                                Learn how
                            </Link>
                        </Typography>
                    </DialogContent>
                </Grid>
                <Grid item xs={12} sx={{ width: '100%' }}>
                    <DialogContent>
                        <FormControl fullWidth focused required>
                            <TextField
                                error={!tempAPIKey}
                                id='apiKey'
                                label='Key'
                                value={tempAPIKey}
                                placeholder='Paste your Key here'
                                onChange={handleAPIKeyUpdate}
                                helperText={
                                    !tempAPIKey ? 'Key is required' : ''
                                }
                            />
                        </FormControl>
                    </DialogContent>
                </Grid>
                <Grid item>
                    <DialogActions>
                        <Button
                            disabled={!tempAPIKey}
                            variant='contained'
                            color='error'
                            size='large'
                            onClick={() => setModalMode(MODAL_MODES.CONFIRM)}
                        >
                            Remove Key
                        </Button>
                        <Button
                            disabled={!canUpdateAPIKey}
                            variant='contained'
                            onClick={handleUpdateClick}
                            size='large'
                        >
                            Update
                        </Button>
                    </DialogActions>
                </Grid>
                <Grid item>
                    <DialogActions>
                        <Button
                            variant='text'
                            onClick={closeModal}
                            size='large'
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Grid>
            </Grid>
        </Dialog>
    );
};

APIKeyUpdateModal.defaultProps = {
    isOpen: false,
};

export default APIKeyUpdateModal;
