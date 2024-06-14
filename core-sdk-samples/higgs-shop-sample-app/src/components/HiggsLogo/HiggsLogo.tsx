import { Box } from '@mui/material';
import logo from '../../assets/images/Dev-higgs.svg';

const HiggsLogo = () => (
    <Box
        component='img'
        alt='Higgs Logo'
        src={logo}
        sx={{ width: '100%', height: 'auto' }}
    />
);

export default HiggsLogo;
