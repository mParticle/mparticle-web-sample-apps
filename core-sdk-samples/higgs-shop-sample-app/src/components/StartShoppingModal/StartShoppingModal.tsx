import React, { useEffect, useState } from 'react';
import {
    Grid,
    Button,
    DialogActions,
    DialogContent,
    Typography,
    Box,
} from '@mui/material';
import mParticle from '@mparticle/web-sdk';
import { HiggsLogo } from '../HiggsLogo';
import HiggsmartLogo from '../../assets/images/higgsmart-logo.svg';
import { useAPIKeyContext } from '../../contexts/APIKeyContext';
import { MODAL_MODES } from '../../constants';
import { ModalContainer } from '../ModalContainer';

const StartShoppingModal: React.FC = () => {
    const [open, setOpen] = useState(false);
    const { modalMode } = useAPIKeyContext();

    const closeModal = () => {
        setOpen(false);
        window.sessionStorage.setItem('ignore_modal', 'true');
    };

    const handleBackgroundClick = () => {
        mParticle.logEvent(
            'Landing Modal Background Click',
            mParticle.EventType.Other,
        );
        closeModal();
    };

    const handleButtonClick = () => {
        mParticle.logEvent('Landing Button Click', mParticle.EventType.Other);
        closeModal();
    };

    const shouldIgnoreModal = () =>
        (window.sessionStorage.getItem('ignore_modal') as unknown as boolean) ||
        false;

    useEffect(() => {
        if (!shouldIgnoreModal() && modalMode === MODAL_MODES.CLOSED) {
            mParticle.logPageView('Landing');
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [modalMode]);

    return (
        <ModalContainer isOpen={open} handleClose={handleBackgroundClick}>
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
                    <Box
                        component='img'
                        src={HiggsmartLogo}
                        alt='HiggsMart'
                        sx={{
                            width: '100%',
                            height: 'auto',
                        }}
                    />
                    <Typography
                        variant='subtitle2'
                        sx={{
                            color: '#FECF61',
                            textTransform: 'uppercase',
                            fontSize: '10px',
                            letterSpacing: '2px',
                        }}
                    >
                        Rocket Surgery Cafe
                    </Typography>
                </Box>
            </Grid>
            <Grid item>
                <DialogContent>
                    <Typography variant='body1' align='center'>
                        Welcome to the mParticle SDK sample app. Everything here
                        is connected to the SDK so you can see what we can do
                        for you!
                    </Typography>
                </DialogContent>
            </Grid>
            <Grid item>
                <DialogActions>
                    <Button variant='contained' onClick={handleButtonClick}>
                        Start Shopping*
                    </Button>
                </DialogActions>
            </Grid>
            <Grid item>
                <Typography
                    variant='caption'
                    align='center'
                    sx={{
                        // For some reason, 'caption' generates a span in MUI
                        // which isn't a block level and won't center properly
                        display: 'block',
                    }}
                >
                    * This app is for demo purposes only. We do not store any
                    information submitted.
                </Typography>
            </Grid>
        </ModalContainer>
    );
};
export default StartShoppingModal;
