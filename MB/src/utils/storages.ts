import AsyncStorage from '@react-native-async-storage/async-storage';

export enum KeyStorage {
    Language = 'babau_language',
    Theme = 'babau_theme',
    Token = 'Token',
    DueDate = 'DueDate',
}

type StorageValue = string;

const get = async (key: KeyStorage): Promise<string | undefined> => {
    const value = await AsyncStorage.getItem(key);
    return value || undefined;
};

const set = async (key: KeyStorage, value: StorageValue) => {
    await AsyncStorage.setItem(key, value);
};

/**
 * Get Object AsyncStorage
 * @param key
 */
const getObject = async <T>(key: KeyStorage): Promise<T | null> => {
    const value = await AsyncStorage.getItem(key);
    if (!value) {
        return null;
    }

    return JSON.parse(value);
};

/**
 * Save array or object AsyncStorage
 * @param key
 * @param value
 */
const saveObject = <T>(key: KeyStorage, value: T): void => {
    AsyncStorage.setItem(key, JSON.stringify(value));
};

const clear = async (callback?: (error?: unknown) => void): Promise<void> => {
    await AsyncStorage.clear(callback);
};

const remove = async (key: KeyStorage) => {
    await AsyncStorage.removeItem(key);
};

const Storages = {
    get,
    getObject,
    set,
    saveObject,
    clear,
    remove,
};

export default Storages;
