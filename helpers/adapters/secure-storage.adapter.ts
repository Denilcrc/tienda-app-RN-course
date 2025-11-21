import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

export class SecureStorageAdapter {

    static async setItem(key: string, value: string) {

        try {
            await SecureStore.setItemAsync(key, value);
        } catch (error) {
            Alert.alert('Error', 'Failed to save data securely.');
        }

    }

    static async getItem(key: string) {
        try {
            const result = await SecureStore.getItemAsync(key); //ojo que es getItemAsync y no getItem
            return result;
        } catch (error) {
            Alert.alert('Error', 'Failed to retrieve data securely.');
            return null;
        }
    }

    static async removeItem(key: string): Promise<void> {
        try {
            await SecureStore.deleteItemAsync(key);
        } catch (error) {
            Alert.alert('Error', 'Failed to delete data securely.');
        }
    }

}
