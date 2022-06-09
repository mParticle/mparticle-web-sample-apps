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

type modalModeType = 'closed' | 'entry' | 'update' | 'confirm';

interface APIKeyContextStore {
    apiKey: string;
    setAPIKey(apiKey: string): void;
    setModalMode(mode: modalModeType): void;
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

const APIKeyContextProvider: React.FC = ({ children }) => {
    // TODO: Should we provide methods to change the api key here?
    //     const apiKey = '12346';
    const [apiKey, setAPIKey] = useState('');
    const [modalMode, setModalMode] = useState<modalModeType>('closed');

    const value = useMemo(() => {
        return { apiKey, setAPIKey, setModalMode };
    }, [apiKey, setAPIKey, setModalMode]);

    useEffect(() => {
        console.log('what is modal mode?', modalMode);
    }, [modalMode]);

    useEffect(() => {
        console.log('what is my api key?', apiKey);
    }, [apiKey]);

    return (
        <APIKeyContext.Provider value={value}>
            <APIKeyEntryModal onSetAPIKey={setAPIKey} />
            <APIKeyUpdateModal
                currentApiKey={apiKey}
                isOpen={modalMode === 'update'}
            />
            <APIKeyRemoveConfirmationModal isOpen={modalMode === 'confirm'} />
            {children}
        </APIKeyContext.Provider>
    );
};

export default APIKeyContextProvider;
