// import { Dispatch, SetStateAction, useState } from 'react';
import useLocalStorage from './useLocalStorage';
// import { useState } from 'react';

// type SetValue<T> = Dispatch<SetStateAction<T>>;

// TODO: Workflow
// Check if is hosted
// .  if not hosted, read from env variables
// ..    render env modal
// .  if hosted, check local storage
// ..    render hosted modal

// function useApiKey(): [string, Dispatch<SetStateAction<string>>] {
function useApiKey(): [string | undefined, boolean | undefined] {
    const [localStorageApiKey] = useLocalStorage('mp-sample-app-api-key', '');
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
