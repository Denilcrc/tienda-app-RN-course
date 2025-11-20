import { authCheckStatus, authLogin } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interfaces/user";
import { create } from "zustand";

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    // methods
    login: (email: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;
}


export const useAuthStore = create<AuthState> () ((set) => ({
    // properties
    status: 'checking',
    token: undefined,
    user: undefined,

    // se podria agregar un method para no repetir codigo, algo como changeAuthStatus y aca manejamos el set

    // methods/actions
    login: async (email: string, password: string) => {
        
        const resp = await authLogin( email, password );

        if ( !resp ) {
            set({ status: 'unauthenticated', user: undefined, token: undefined });
            // todo:llamar el logout
            return false;
        }

        set({ status: 'authenticated', user: resp.user, token: resp.token });

        // todo persistir token en storage

        return true;
    },

    checkStatus: async () => {
        const resp = await authCheckStatus(); 

        if ( !resp ) {
            set({ status: 'unauthenticated', user: undefined, token: undefined });
            // todo:llamar el logout
            return;
        }

        set({ status: 'authenticated', user: resp.user, token: resp.token });

        // todo persistir token en storage

        return;

    },

    logout: async () => {
        // todo clear token del storage


        set({ status: 'unauthenticated', user: undefined, token: undefined });
    }
}));