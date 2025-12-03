import { create } from "zustand";

interface TemporalCameraStoreState { //temporal porque se impacta la db hasta dar al btn guardar 
    selectedImage: string[]

    addSelectedImage: (image:string) => void
    clearImages: () => void
}


export const useCameraStore = create<TemporalCameraStoreState>()((set, get)=>({

    selectedImage: [],

    addSelectedImage: (image) => { // imagenes actuales (no guardadas todavia)
        set( (state) => ({selectedImage: [...state.selectedImage, image]}) )
    },

    clearImages: () => set({selectedImage: []})
}));



