import {
    Dialog,
    DialogActions,
    DialogContent,
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
            <DialogContent>
                <Typography variant='body1' align='center'>
                    {message}
                </Typography>
            </DialogContent>
            {buttonAction && <DialogActions>{buttonAction}</DialogActions>}
        </Dialog>
    );
};

export default MessageModal;

MessageModal.defaultProps = {
    buttonAction: undefined,
};
