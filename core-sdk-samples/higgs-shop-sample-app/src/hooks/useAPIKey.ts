import { LOCAL_STORAGE_KEY } from '../constants';
import useLocalStorage from './useLocalStorage';

function useApiKey(): [string | undefined, boolean | undefined] {
    const [localStorageApiKey] = useLocalStorage(LOCAL_STORAGE_KEY, '');
    const envApiKey = process.env.REACT_APP_MPARTICLE_API_KEY;

    const isHosted = process.env.REACT_APP_HOSTED?.toLowerCase() === 'true';

    let apiKey = '';
    if (isHosted) {
        apiKey = localStorageApiKey || '';
    } else {
        apiKey = envApiKey || '';
    }

    return [apiKey, isHosted];
}

export default useApiKey;
