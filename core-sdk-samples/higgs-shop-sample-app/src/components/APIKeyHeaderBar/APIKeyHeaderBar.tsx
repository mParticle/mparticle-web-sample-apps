import { Box, Button, Container, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyIcon from '@mui/icons-material/Key';
import React from 'react';
import { useAPIKeyContext } from '../../contexts/APIKeyContext';
import useApiKey from '../../hooks/useAPIKey';

const APIKeyHeaderBar: React.FC = () => {
    const { setModalMode } = useAPIKeyContext();
    const [, isHosted] = useApiKey();

    if (!isHosted) {
        return <div />;
    }

    return (
        <Container
            maxWidth={false}
            sx={{
                height: '50px',
                backgroundColor: '#0F224C',
                display: {
                    xs: 'none',
                    md: 'flex',
                },
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                }}
            >
                <Typography variant='subtitle1' sx={{ px: '6px', py: '8px' }}>
                    You are viewing the mParticle Web Sample App
                </Typography>
                <Button
                    variant='text'
                    startIcon={<GitHubIcon />}
                    target='_blank'
                    // TODO: Refactor url into constant once we integrate
                    href='https://github.com/mParticle/mparticle-web-sample-apps'
                >
                    Learn more
                </Button>
            </Box>
            <Button
                variant='text'
                startIcon={<KeyIcon />}
                onClick={() => setModalMode('update')}
            >
                Web Key
            </Button>
        </Container>
    );
};

export default APIKeyHeaderBar;
