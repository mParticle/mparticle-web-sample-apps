import { Dialog, Grid } from '@mui/material';
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    handleClose?: () => void;
}
const ModalContainer: React.FC<ModalProps> = ({
    isOpen,
    handleClose,
    children,
}) => {
    return (
        <Dialog
            open={isOpen}
            sx={{
                '& .MuiDialog-container': {
                    '& .MuiPaper-root': {
                        margin: '8px',
                    },
                },
            }}
            onClose={handleClose}
        >
            <Grid
                container
                columns={1}
                spacing={2}
                sx={{
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
                {children}
            </Grid>
        </Dialog>
    );
};

ModalContainer.defaultProps = {
    handleClose: () => {
        return true;
    },
};

export default ModalContainer;
