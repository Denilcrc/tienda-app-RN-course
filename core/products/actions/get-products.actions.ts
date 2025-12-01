import { API_URL, productsApi } from "@/core/api/productsApi";
import { type Product } from "../interfaces/product.interface";


export const getProducts = async (limit = 20, offset = 0) => {

    try {
        
        const { data } = await productsApi.get<Product[]>('/products', {
            params: {
                limit,
                offset
            }
        })
        // console.log(data)
        return data.map(product => ({
            ...product,
            // modificar el la img para poder recibirla como url completa
            images: product.images.map((img) => `${API_URL}/files/product/${img}`)
        }));
    } catch (error) {
        throw new Error('Error al obtener los productos');
    }
    
}
