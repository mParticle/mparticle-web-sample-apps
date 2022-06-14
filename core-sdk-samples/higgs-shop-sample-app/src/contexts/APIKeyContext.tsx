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
import { LOCAL_STORAGE_KEY, ModalModeTypes, MODAL_MODES } from '../constants';
import useApiKey from '../hooks/useAPIKey';
import useLocalStorage from '../hooks/useLocalStorage';

interface APIKeyContextStore {
    apiKey: string | undefined;
    modalMode: ModalModeTypes;
    setAPIKey(apiKey: string): void;
    setModalMode(mode: ModalModeTypes): void;
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
    const [apiKey, isHosted] = useApiKey();
    const [localStorageApiKey, setLocalStorageApiKey, removeLocalStorageKey] =
        useLocalStorage(LOCAL_STORAGE_KEY, '');
    const [modalMode, setModalMode] = useState<ModalModeTypes>(
        MODAL_MODES.CLOSED,
    );

    const value = useMemo(() => {
        const setAPIKey = (key: string) => {
            setLocalStorageApiKey(key);
            window.location.reload();
        };

        const removeAPIKey = () => {
            removeLocalStorageKey();
            window.location.reload();
        };

        return {
            apiKey,
            modalMode,
            setAPIKey,
            setModalMode,
            removeAPIKey,
        };
    }, [localStorageApiKey, modalMode, setModalMode]);

    useEffect(() => {
        if (!apiKey && !isHosted) {
            setModalMode(MODAL_MODES.LOCAL_DEV);
        } else if (!apiKey && isHosted) {
            setModalMode(MODAL_MODES.ENTRY);
        }
    }, [apiKey]);

    return (
        <APIKeyContext.Provider value={value}>
            <APIKeyEntryModal
                isOpen={modalMode === MODAL_MODES.ENTRY && !apiKey}
            />
            <APIKeyUpdateModal isOpen={modalMode === MODAL_MODES.UPDATE} />
            <APIKeyRemoveConfirmationModal
                isOpen={modalMode === MODAL_MODES.CONFIRM}
            />
            <APIKeyEnvMessageModal
                isOpen={modalMode === MODAL_MODES.LOCAL_DEV && !apiKey}
            />
            {children}
        </APIKeyContext.Provider>
    );
};

export default APIKeyContextProvider;
