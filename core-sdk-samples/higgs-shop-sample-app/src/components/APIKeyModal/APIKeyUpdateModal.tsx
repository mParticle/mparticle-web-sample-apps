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

interface APIKeyUpdateModalProps {
    currentApiKey: string;
    isOpen?: boolean;
}

const APIKeyUpdateModal: React.FC<APIKeyUpdateModalProps> = ({
    currentApiKey,
    isOpen,
}) => {
    const [NewAPIKey, setNewAPIKey] = useState(currentApiKey);
    const [open, setOpen] = useState(false);
    const [canUpdateAPIKey, setCanUpdateAPIKey] = useState(false);

    const { setAPIKey, setModalMode } = useAPIKeyContext();

    const closeModal = () => {
        setModalMode('closed');
        setOpen(false);
    };

    const handleAPIKeyUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewAPIKey(e.target.value);
        if (e.target.value === '' || e.target.value === currentApiKey) {
            setCanUpdateAPIKey(false);
        } else {
            setCanUpdateAPIKey(true);
        }
    };

    const handleButtonClick = () => {
        // TODO: Pass API Key to parent
        setAPIKey(NewAPIKey);
        closeModal();
    };

    useEffect(() => {
        console.log('peekaboo');
        // Reset to current api key upon open
        setNewAPIKey(currentApiKey);
    }, [open]);

    useEffect(() => {
        console.log('update: api key changed', currentApiKey);
    }, [currentApiKey]);

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
                            order to connect this sample app to your account.
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
                                error={!NewAPIKey}
                                id='apiKey'
                                label='Key'
                                value={NewAPIKey}
                                placeholder='Paste your Key here'
                                onChange={handleAPIKeyUpdate}
                                helperText={!NewAPIKey ? 'Key is required' : ''}
                            />
                        </FormControl>
                    </DialogContent>
                </Grid>
                <Grid item>
                    <DialogActions>
                        <Button
                            disabled={!NewAPIKey}
                            variant='contained'
                            color='error'
                            size='large'
                            onClick={() => setModalMode('confirm')}
                        >
                            Remove Key
                        </Button>
                        <Button
                            disabled={!canUpdateAPIKey}
                            variant='contained'
                            onClick={handleButtonClick}
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
