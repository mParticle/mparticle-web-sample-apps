import { Button, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';

const BackButton = () => {
    return (
        <Button
            variant='text'
            color='primary'
            startIcon={<ArrowBackIosIcon />}
            component={Link}
            to='/shop'
        >
            <Typography variant='body1' color='inherit'>
                Back
            </Typography>
        </Button>
    );
};

export default BackButton;
