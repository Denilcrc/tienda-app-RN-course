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

//funcion para preparar las imagenes antes de enviarlas al backend
const prepareImagesForUpload = async(images: string[]): Promise<string[]> => {

    //separar las imagenes que ya estan en el servidor de las que son nuevas
    const fileImages = images.filter(img => img.startsWith('file'));
    const currentImages = images.filter(img => !img.startsWith('file')); //porque asi esta en el backend 

    if (fileImages.length > 0) {
        const uploadPromises = fileImages.map(img => uploadImages(img));
        const uploadedImages = await Promise.all(uploadPromises);
        
        currentImages.push(...uploadedImages)
    }

    return currentImages.map(img => img.split('/').pop()!); //devolvemos solo el nombre de la imagen
}


const uploadImages = async (image:string): Promise<string> => {

    const formData = new FormData() as any;

    formData.append('file', {
        uri: image,
        type: 'image/jpeg',
        name: image.split('/').pop(),
    })

    const {data} = await productsApi.post<{image: string}>('/files/product', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });

    return data.image;
}

const updatedProduct = async (product: Partial<Product>) => {
    
    // console.log({images: product.images})
    const {id, images = [], user, ...rest} = product

    try {
        
        const checkedImages = await prepareImagesForUpload(images)

        const {} = await productsApi.patch<Product>(`/products/${id}`, {
            ...rest,
            images: checkedImages,
        });

        return product

    } catch (error) {
        throw new Error("Error al actualizar el producto");
    }
    
}

const createProduct = async (product: Partial<Product>) => {

    const {id, images = [], user, ...rest} = product

    try {
        
        const checkedImages = await prepareImagesForUpload(images)

        const {} = await productsApi.post<Product>(`/products`, {
            ...rest,
            images: checkedImages,
        });

        return product

    } catch (error) {
        throw new Error("Error al actualizar el producto");
    }
}

