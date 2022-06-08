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

interface APIKeyUpdateModalProps {
    currentApiKey: string;
}

const APIKeyUpdateModal: React.FC<APIKeyUpdateModalProps> = ({
    currentApiKey,
}) => {
    const [apiKey, setAPIKey] = useState(currentApiKey);
    const [open, setOpen] = useState(true);
    const [canUpdateAPIKey, setCanUpdateAPIKey] = useState(false);

    const closeModal = () => {
        setOpen(false);
    };

    const handleAPIKeyUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAPIKey(e.target.value);
        if (e.target.value === '' || e.target.value === currentApiKey) {
            setCanUpdateAPIKey(false);
        } else {
            setCanUpdateAPIKey(true);
        }
    };

    const handleButtonClick = () => {
        // TODO: Pass API Key to parent
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
                                error={!apiKey}
                                id='apiKey'
                                label='Key'
                                value={apiKey}
                                placeholder='Paste your Key here'
                                onChange={handleAPIKeyUpdate}
                                helperText={!apiKey ? 'Key is required' : ''}
                            />
                        </FormControl>
                    </DialogContent>
                </Grid>
                <Grid item>
                    <DialogActions>
                        <Button
                            disabled={!apiKey}
                            variant='contained'
                            color='error'
                            size='large'
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
                            onClick={() => setOpen(false)}
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

export default APIKeyUpdateModal;
