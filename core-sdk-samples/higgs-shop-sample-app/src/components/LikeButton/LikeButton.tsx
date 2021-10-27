import { useState } from 'react';
import Button from '@mui/material/Button';
import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAlt from '@mui/icons-material/ThumbUpOffAlt';
import mParticle from '@mparticle/web-sdk';

const LikeButton = () => {
    const [buttonState, setbuttonState] = useState(false);

    const toggleState = () => setbuttonState((state) => !state);

    const handleClick = () => {
        toggleState();

        if (buttonState) {
            mParticle.logEvent('Higgs Unlike', mParticle.EventType.Social);
        } else {
            mParticle.logEvent('Higgs Like', mParticle.EventType.Social);
        }
    };

    return (
        <Button
            variant={buttonState ? 'contained' : 'outlined'}
            color='primary'
            name='like-button'
            type='button'
            startIcon={buttonState ? <ThumbUpAlt /> : <ThumbUpOffAlt />}
            onClick={() => handleClick()}
        >
            {buttonState ? 'Unlike' : 'Like'}
        </Button>
    );
};

export default LikeButton;
