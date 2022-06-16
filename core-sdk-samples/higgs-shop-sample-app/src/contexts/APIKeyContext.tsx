// TS incorrectly flags function declarations as unused variables
/* eslint-disable no-unused-vars */
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    APIKeyEntryModal,
    APIKeyRemoveConfirmationModal,
    APIKeyUpdateModal,
    APIKeyEnvMessageModal,
} from '../components/APIKeyModal';
import useApiKey from '../hooks/useAPIKey';
import useLocalStorage from '../hooks/useLocalStorage';

type modalModeType = 'closed' | 'entry' | 'update' | 'confirm' | 'env';

interface APIKeyContextStore {
    apiKey: string;
    getAPIKey(): string;
    setAPIKey(apiKey: string): void;
    setModalMode(mode: modalModeType): void;
    removeAPIKey(): void;
}

const APIKeyContext = createContext({} as APIKeyContextStore);

export function useAPIKeyContext() {
    const context = useContext(APIKeyContext);

    if (!context) {
        throw new Error(
            'useAPIKeyContext must be used within a APIKeyContextProvider',
        );
    }

    return context;
}

// TODO: Reload app every time API Key changes or is updated
// TODO: Move message modal from index to here

const APIKeyContextProvider: React.FC = ({ children }) => {
    const [dasApiKey, isHosted] = useApiKey();
    const [apiKey, setAPIKey, _removeApiKey] = useLocalStorage(
        'mp-sample-app-api-key',
        '',
    );
    const [modalMode, setModalMode] = useState<modalModeType>('closed');

    const value = useMemo(() => {
        const getAPIKey = () => {
            return apiKey;
        };

        const removeAPIKey = () => {
            _removeApiKey();
            window.location.reload();
        };

        return { apiKey, getAPIKey, setAPIKey, setModalMode, removeAPIKey };
    }, [apiKey, setAPIKey, setModalMode]);

    useEffect(() => {
        if (!dasApiKey && !isHosted) {
            setModalMode('env');
        } else if (!dasApiKey && isHosted) {
            setModalMode('entry');
        }
    }, [dasApiKey]);

    useEffect(() => {
        console.warn('modal mode changed', modalMode);
    }, [modalMode]);

    return (
        <APIKeyContext.Provider value={value}>
            <APIKeyEntryModal isOpen={modalMode === 'entry' && !dasApiKey} />
            <APIKeyUpdateModal isOpen={modalMode === 'update'} />
            <APIKeyRemoveConfirmationModal isOpen={modalMode === 'confirm'} />
            <APIKeyEnvMessageModal isOpen={modalMode === 'env' && !dasApiKey} />
            {children}
        </APIKeyContext.Provider>
    );
};

export default APIKeyContextProvider;
