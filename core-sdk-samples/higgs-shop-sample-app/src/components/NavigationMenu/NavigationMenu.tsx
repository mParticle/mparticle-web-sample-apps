import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Box,
    Container,
    Toolbar,
    CssBaseline,
    MenuList,
    MenuItem,
    IconButton,
    alpha,
    SxProps,
    Theme,
} from '@mui/material';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import mParticle from '@mparticle/web-sdk';
import NavigationMenuItem from './NavigationMenuItem';
import NavigationMenuDrawer from './NavigationMenuDrawer';
import HiggsmartLogo from '../HiggsLogo/HiggsmartLogo';
import theme from '../../contexts/theme';

const NavigationMenu: React.FC = () => {
    const classes: SxProps<Theme> = {
        appBar: {},
        drawer: {},
        link: {
            mx: 3,
            '&:hover': {
                color: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
        },
        drawerList: {
            width: 304,
        },
        drawerLinkIcon: {
            ml: 3,
            mr: 6,
        },
        drawerLink: {
            color: alpha(theme.palette.primary.contrastText, 0.6),
            height: 60,
            width: 1,
            '&:hover': {
                color: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
        },
        topnavList: { display: 'flex' },
        homeLink: {},
        mobileResponsive: {
            flexGrow: 1,
            display: { xs: 'flex', md: 'none' },
            alignItems: 'stretch',
            justifyContent: 'space-between',
        },
        desktopResponsive: {
            flexGrow: 1,
            display: {
                xs: 'none',
                md: 'flex',
            },
            alignItems: 'center',
            justifyContent: 'center',
        },
    };

    const [drawerState, setDrawerState] = useState(false);

    const trackNavClick = (label: string) => {
        // In cases where you need to track non-standard navigation clicks
        // such as navigation icons or a hamburger menu, it is recommended
        // that you treat these as custom navigation events and define a label
        // in the custom attributes that you pass to mParticle.
        // This can then be added to your component's onClick prop.
        const customAttributes: mParticle.SDKEventAttrs = {
            label,
        };

        mParticle.logEvent(
            'Navbar Click',
            mParticle.EventType.Navigation,
            customAttributes,
        );
    };

    const handleHamburgerClick = () => {
        trackNavClick('Hamburger');

        setDrawerState(true);
    };

    const closeDrawer = () => {
        setDrawerState(false);
    };

    // The following mobile items use the trackNav convenience
    // method defined above
    const topNavMobileItems: ReactElement[] = [
        <IconButton
            aria-label='Open Mobile Menu'
            data-testid='mobile-nav-hamburger-button'
            key='hamburger'
            size='large'
            color='inherit'
            onClick={handleHamburgerClick}
        >
            <MenuIcon />
        </IconButton>,

        <MenuItem
            aria-label='Mobile Home Page'
            data-testid='mobile-nav-home-button'
            key='home'
            component={Link}
            to='/'
            onClick={() => trackNavClick('Home')}
            sx={[classes.link, classes.homeLink]}
        >
            <HiggsmartLogo />
        </MenuItem>,

        <IconButton
            data-testid='mobile-nav-cart-button'
            key='cart'
            size='large'
            color='inherit'
            component={Link}
            to='/cart'
            onClick={() => trackNavClick('Cart Icon')}
        >
            <ShoppingCartIcon />
        </IconButton>,
    ];

    // The following desktop navigation items use mParticle.logEvent
    // internally so that they stay DRY and handle optional callbacks.
    const topNavDesktopItems: ReactElement[] = [
        <NavigationMenuItem
            testId='desktop-nav-shop-button'
            component={Link}
            to='/shop'
            sx={classes.link}
            label='Shop'
            key='Shop'
        />,

        <NavigationMenuItem
            testId='desktop-nav-about-button'
            component={Link}
            to='/about'
            sx={classes.link}
            label='About'
            key='About'
        />,

        <MenuItem
            data-testid='desktop-nav-home-button'
            aria-label='Desktop Home Page'
            key='home'
            component={Link}
            to='/'
            sx={[classes.link, classes.homeLink]}
        >
            <HiggsmartLogo />
        </MenuItem>,

        <NavigationMenuItem
            testId='desktop-nav-account-button'
            component={Link}
            to='/account'
            sx={classes.link}
            label='Account'
            key='Account'
        />,

        <NavigationMenuItem
            testId='desktop-nav-cart-button'
            component={Link}
            to='/cart'
            sx={classes.link}
            label='Cart'
            key='Cart'
        />,
    ];

    const drawerMenuItems: ReactElement[] = [
        <NavigationMenuItem
            testId='drawer-nav-shop-button'
            key='shop'
            component={Link}
            to='/shop'
            sx={classes.drawerLink}
            clickCallback={closeDrawer}
            label='Shop'
            iconLeft={<CheckroomIcon sx={classes.drawerLinkIcon} />}
        />,

        <NavigationMenuItem
            testId='drawer-nav-about-button'
            key='about'
            component={Link}
            to='/about'
            sx={classes.drawerLink}
            clickCallback={closeDrawer}
            label='About'
            iconLeft={<InfoIcon sx={classes.drawerLinkIcon} />}
        />,

        <NavigationMenuItem
            testId='drawer-nav-account-button'
            key='account'
            component={Link}
            to='/account'
            sx={classes.drawerLink}
            clickCallback={closeDrawer}
            label='Account'
            iconLeft={<PersonIcon sx={classes.drawerLinkIcon} />}
        />,

        <NavigationMenuItem
            testId='drawer-nav-cart-button'
            key='cart'
            component={Link}
            to='/cart'
            sx={classes.drawerLink}
            clickCallback={closeDrawer}
            iconLeft={<ShoppingCartIcon sx={classes.drawerLinkIcon} />}
            label='Cart'
        />,
    ];

    return (
        <AppBar position='static' sx={classes.appBar} color='transparent'>
            <CssBaseline />
            <Container maxWidth='xl'>
                <NavigationMenuDrawer
                    testId='drawer-menu'
                    sx={classes.drawer}
                    toggleState={drawerState}
                    handleDrawerClose={closeDrawer}
                >
                    <MenuList sx={classes.drawerList}>
                        {drawerMenuItems}
                    </MenuList>
                </NavigationMenuDrawer>
                <Toolbar disableGutters>
                    <Box sx={classes.mobileResponsive}>{topNavMobileItems}</Box>
                    <Box sx={classes.desktopResponsive}>
                        <MenuList sx={classes.topnavList}>
                            {topNavDesktopItems}
                        </MenuList>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavigationMenu;
