import {
    Button,
    DialogActions,
    DialogContent,
    Grid,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MODAL_MODES } from '../../constants';
import { useAPIKeyContext } from '../../contexts/APIKeyContext';
import { ModalContainer } from '../ModalContainer';

interface APIKeyRemoveConfirmationModalProps {
    isOpen?: boolean;
}

const APIKeyRemoveConfirmationModal: React.FC<
    APIKeyRemoveConfirmationModalProps
> = ({ isOpen }) => {
    const [open, setOpen] = useState(false);

    const { setModalMode, removeAPIKey } = useAPIKeyContext();

    const handleRemoveKeyClick = () => {
        removeAPIKey();
        setModalMode(MODAL_MODES.CLOSED);
        setOpen(false);
    };

    const handleBackClick = () => {
        setModalMode(MODAL_MODES.UPDATE);
        setOpen(false);
    };

    useEffect(() => {
        setOpen(isOpen || false);
    }, [isOpen]);

    return (
        <ModalContainer isOpen={open}>
            <Grid item>
                <Typography variant='h4'>Are you sure?</Typography>
            </Grid>
            <Grid item>
                <DialogContent>
                    <Typography variant='body1' align='center'>
                        Clearing your key will disconnect your sample app from
                        mParticle and reset the app.
                    </Typography>
                </DialogContent>
            </Grid>
            <Grid item>
                <DialogActions>
                    <Button
                        variant='contained'
                        color='error'
                        size='large'
                        onClick={handleRemoveKeyClick}
                    >
                        Remove key &amp; reset app
                    </Button>
                </DialogActions>
            </Grid>
            <Grid item>
                <DialogActions>
                    <Button
                        variant='text'
                        size='large'
                        onClick={handleBackClick}
                    >
                        Back
                    </Button>
                </DialogActions>
            </Grid>
        </ModalContainer>
    );
};

APIKeyRemoveConfirmationModal.defaultProps = {
    isOpen: false,
};

export default APIKeyRemoveConfirmationModal;
