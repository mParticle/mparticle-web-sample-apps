import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

const APIKeyRemoveConfirmationModal: React.FC = () => {
    const [open, setOpen] = useState(true);
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
                        <Button variant='contained' color='error' size='large'>
                            Remove key &amp; reset app
                        </Button>
                    </DialogActions>
                </Grid>
                <Grid item>
                    <DialogActions>
                        <Button
                            variant='text'
                            size='large'
                            onClick={() => setOpen(false)}
                        >
                            Back
                        </Button>
                    </DialogActions>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default APIKeyRemoveConfirmationModal;
