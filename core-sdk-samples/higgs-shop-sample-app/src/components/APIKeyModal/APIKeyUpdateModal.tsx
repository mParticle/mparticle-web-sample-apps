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
    const { apiKey, setAPIKey, setModalMode } = useAPIKeyContext();

    const [currentAPIKey, setCurrentAPIKey] = useState(apiKey);
    const [open, setOpen] = useState(false);
    const [canUpdateAPIKey, setCanUpdateAPIKey] = useState(false);

    const closeModal = () => {
        setModalMode(MODAL_MODES.CLOSED);
        setOpen(false);
    };

    const handleAPIKeyUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentAPIKey(e.target.value);
        if (e.target.value === '' || e.target.value === apiKey) {
            setCanUpdateAPIKey(false);
        } else {
            setCanUpdateAPIKey(true);
        }
    };

    const handleUpdateClick = () => {
        if (currentAPIKey) {
            setAPIKey(currentAPIKey);
            closeModal();
        }
    };

    useEffect(() => {
        // Reset to current api key upon open
        setCurrentAPIKey(apiKey);
        setCanUpdateAPIKey(false);
    }, [open]);

    useEffect(() => {
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
                                error={!currentAPIKey}
                                id='apiKey'
                                label='Key'
                                value={currentAPIKey}
                                placeholder='Paste your Key here'
                                onChange={handleAPIKeyUpdate}
                                helperText={
                                    !currentAPIKey ? 'Key is required' : ''
                                }
                            />
                        </FormControl>
                    </DialogContent>
                </Grid>
                <Grid item>
                    <DialogActions>
                        <Button
                            disabled={!currentAPIKey}
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
