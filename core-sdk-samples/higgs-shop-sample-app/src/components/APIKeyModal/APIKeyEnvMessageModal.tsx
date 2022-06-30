import React from 'react';
import { Button } from '@mui/material';
import { MessageModal } from '../MessageModal';
import {
    APIkeyModalMessage,
    DOCSITE_API_KEY_QUICKSTART,
    SAMPLE_APP_README_GITHUB_REPOSITORY_URL,
} from '../../constants';

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
                        href={SAMPLE_APP_README_GITHUB_REPOSITORY_URL}
                    >
                        Go to Readme
                    </Button>
                    <Button
                        variant='contained'
                        target='_blank'
                        href={DOCSITE_API_KEY_QUICKSTART}
                    >
                        Go to Docs
                    </Button>
                </>
            }
        />
    );
};

export default APIKeyEnvMessageModal;
