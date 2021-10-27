import React from 'react';
import { Box, SxProps, Theme, Typography } from '@mui/material';

interface WrappedTypographyProps {
    text: string;
    variant: 'body1' | 'body2';
    sx?: SxProps<Theme>;
}

const WrappedTypography: React.FC<WrappedTypographyProps> = ({
    text,
    variant,
    sx,
}) => {
    return (
        <Box sx={sx}>
            {text
                .trim()
                .split('\n')
                .map((b: string) => (
                    <Typography variant={variant} key={b}>
                        {b}
                    </Typography>
                ))}
        </Box>
    );
};

WrappedTypography.defaultProps = {
    sx: {},
};

export default WrappedTypography;
