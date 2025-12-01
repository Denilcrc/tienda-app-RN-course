
import { SecureStorageAdapter } from '@/helpers/adapters/secure-storage.adapter';
import axios from 'axios';
import { Platform } from 'react-native';


// conectar mediante envs vars, android e ios
const STAGE = process.env.EXPO_PUBLIC_STAGE || 'dev';

export const API_URL = 
    (STAGE === 'prod')
        ? process.env.EXPO_PUBLIC_API_URL
        : (Platform.OS === 'ios')
            ? process.env.EXPO_PUBLIC_API_URL_IOS
            : process.env.EXPO_PUBLIC_API_URL_ANDROID;

console.log({STAGE, [Platform.OS] : API_URL})

const productsApi = axios.create({
    baseURL: API_URL
});

//? se agregan interceptores 
productsApi.interceptors.request.use( async(config) => { //use es un middleware que se ejecuta antes de la peticion

    // verificar si tenemos un token en el secure storage
    const token = await SecureStorageAdapter.getItem('token'); //puede ser null

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

export {
    productsApi
};

