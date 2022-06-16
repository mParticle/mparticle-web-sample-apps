import React from 'react';
import { Button } from '@mui/material';
import { MessageModal } from '../MessageModal';
import { APIkeyModalMessage } from '../../constants';

interface APIKeyEnvMessageModalProps {
    isOpen: boolean;
}

const APIKeyEnvMessageModal: React.FC<APIKeyEnvMessageModalProps> = ({
    isOpen,
}) => {
    return (
        <MessageModal
            message={APIkeyModalMessage}
            open={isOpen}
            buttonAction={
                <>
                    <Button
                        variant='contained'
                        target='_blank'
                        href='https://github.com/mParticle/mparticle-web-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/README.md'
                    >
                        Go to Readme
                    </Button>
                    <Button
                        variant='contained'
                        target='_blank'
                        href='https://docs.mparticle.com/developers/quickstart/senddata/#1-generate-your-api-key-2'
                    >
                        Go to Docs
                    </Button>
                </>
            }
        />
    );
};

export default APIKeyEnvMessageModal;
