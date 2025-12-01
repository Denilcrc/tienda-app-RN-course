import { productsApi } from "@/core/api/productsApi";
import { Product } from "../interfaces/product.interface";


export const updateCreateProduct = (product: Partial<Product>) => {

    // esto lo hacemos porque el backend es bien estricto con los tipos y asi aseguramos que sean numeros
    product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
    product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

    // validacion para saber si el producto existe o es nuevo
    if (product.id && product.id !== 'new') {
        return updatedProduct(product);
    }
    return createProduct(product);
}

const updatedProduct = async (product: Partial<Product>) => {
    
    const {id, images = [], user, ...rest} = product

    try {
        
        const {} = await productsApi.patch<Product>(`/products/${id}`, {
            // todo: images
            ...rest,
        });

        return product

    } catch (error) {
        throw new Error("Error al actualizar el producto");
    }
    
}

const createProduct = async (product: Partial<Product>) => {

    const {id, images = [], user, ...rest} = product

    try {
        
        const {} = await productsApi.post<Product>(`/products`, {
            // todo: images
            ...rest,
        });

        return product

    } catch (error) {
        throw new Error("Error al actualizar el producto");
    }
}

