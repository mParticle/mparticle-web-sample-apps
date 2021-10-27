import React, { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Typography,
    MenuItem,
    SvgIconTypeMap,
    SxProps,
    Theme,
} from '@mui/material';
import mParticle from '@mparticle/web-sdk';

interface NavigationMenuItemProps {
    testId: string;
    component: typeof Link;
    to: string;
    sx: SxProps<Theme>;
    label: string;
    clickCallback?: () => void;
    iconLeft?: ReactElement<SvgIconTypeMap>;
}

const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({
    component,
    to,
    sx,
    label,
    clickCallback,
    iconLeft,
    testId,
}) => {
    const { pathname } = useLocation();
    const selected = pathname === to && to !== '/';

    const handleClick = () => {
        // In some cases, you may need to track a visitor based on what navigation
        // items or buttons they may click. mParticle's custom events can be used to
        // for this by passing in an EventType of `Navigation` and simply adding
        // whatever custom attributes you may need. In this example, we are simply
        // tracking what label a visitor is clicking.
        const customAttributes: mParticle.SDKEventAttrs = { label };
        mParticle.logEvent(
            'Navbar Click',
            mParticle.EventType.Navigation,
            customAttributes,
        );

        if (typeof clickCallback === 'function') {
            clickCallback();
        }
    };

    return (
        <MenuItem
            data-testid={testId}
            selected={selected}
            component={component}
            to={to}
            sx={sx}
            onClick={handleClick}
        >
            {iconLeft}
            <Typography>{label}</Typography>
        </MenuItem>
    );
};

NavigationMenuItem.defaultProps = {
    iconLeft: undefined,
    clickCallback: undefined,
};

export default NavigationMenuItem;
