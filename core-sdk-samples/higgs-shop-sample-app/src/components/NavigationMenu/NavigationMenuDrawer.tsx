import { Drawer, SxProps, Theme } from '@mui/material';
import React from 'react';

interface NavigationMenuDrawerProps {
    sx: SxProps<Theme>;
    toggleState: boolean;
    handleDrawerClose: () => void;
    testId: string;
}

const NavigationMenuDrawer: React.FC<NavigationMenuDrawerProps> = ({
    sx,
    toggleState,
    handleDrawerClose,
    children,
    testId,
}) => {
    return (
        <Drawer
            data-testid={testId}
            open={toggleState}
            anchor='left'
            sx={sx}
            onClose={handleDrawerClose}
        >
            {children}
        </Drawer>
    );
};

export default NavigationMenuDrawer;
