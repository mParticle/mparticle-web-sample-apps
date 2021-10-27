import { Box } from '@mui/material';
import logo from '../../assets/images/higgsmart-logo.svg';

const HiggsmartLogo = () => (
    <Box
        component='img'
        src={logo}
        alt='HiggsMart'
        sx={{ width: '100%', height: 'auto' }}
    />
);

export default HiggsmartLogo;
