import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAPIKeyContext } from '../../contexts/APIKeyContext';

interface APIKeyRemoveConfirmationModalProps {
    isOpen?: boolean;
}

const APIKeyRemoveConfirmationModal: React.FC<
    APIKeyRemoveConfirmationModalProps
> = ({ isOpen }) => {
    const [open, setOpen] = useState(false);

    const { setAPIKey, setModalMode } = useAPIKeyContext();

    const handleRemoveKeyClick = () => {
        setAPIKey('');
        setModalMode('closed');
        setOpen(false);
    };

    const handleBackClick = () => {
        setModalMode('update');
        setOpen(false);
    };

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
                    <Typography variant='h4'>Are you sure?</Typography>
                </Grid>
                <Grid item>
                    <DialogContent>
                        <Typography variant='body1' align='center'>
                            Clearing your key will disconnect your sample app
                            from mParticle and reset the app.
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
            </Grid>
        </Dialog>
    );
};

APIKeyRemoveConfirmationModal.defaultProps = {
    isOpen: false,
};

export default APIKeyRemoveConfirmationModal;
