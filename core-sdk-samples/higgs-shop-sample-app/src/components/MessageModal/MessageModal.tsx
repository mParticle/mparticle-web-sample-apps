import {
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    Typography,
} from '@mui/material';
import React from 'react';

interface MessageModalProps {
    message: string;
    open: boolean;
    buttonAction?: JSX.Element;
}
const MessageModal: React.FC<MessageModalProps> = ({
    open,
    message,
    buttonAction,
}) => {
    return (
        <Dialog open={open}>
            <Grid
                container
                columns={1}
                spacing={2}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Grid item>
                    <DialogContent>
                        <Typography variant='body1' align='center'>
                            {message}
                        </Typography>
                    </DialogContent>
                </Grid>
                {buttonAction && (
                    <Grid item>
                        <DialogActions>{buttonAction}</DialogActions>
                    </Grid>
                )}
            </Grid>
        </Dialog>
    );
};

export default MessageModal;

MessageModal.defaultProps = {
    buttonAction: undefined,
};
