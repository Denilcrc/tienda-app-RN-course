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

// todo: agregar interceptores (ver documentacion de axios)

export {
    productsApi
};

