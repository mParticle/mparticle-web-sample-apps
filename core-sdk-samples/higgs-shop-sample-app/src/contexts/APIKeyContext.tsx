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
} from '../components/APIKeyModal';
import useLocalStorage from '../hooks/useLocalStorage';

type modalModeType = 'closed' | 'entry' | 'update' | 'confirm';

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

const APIKeyContextProvider: React.FC = ({ children }) => {
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
        if (!apiKey) {
            setModalMode('entry');
        }
    }, [apiKey]);

    return (
        <APIKeyContext.Provider value={value}>
            <APIKeyEntryModal isOpen={modalMode === 'entry'} />
            <APIKeyUpdateModal isOpen={modalMode === 'update'} />
            <APIKeyRemoveConfirmationModal isOpen={modalMode === 'confirm'} />
            {children}
        </APIKeyContext.Provider>
    );
};

export default APIKeyContextProvider;
