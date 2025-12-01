import { API_URL, productsApi } from "@/core/api/productsApi";
import { Gender, type Product } from "../interfaces/product.interface";


const emptyProduct: Product = {
    id: '',
    title: 'Nuevo Producto',
    description: '',
    price: 0,
    images: [],
    slug: '',
    gender: Gender.Men,
    sizes: [],
    stock: 0,
    tags: [],
}

export const getProductById = async (id: string): Promise<Product> => {

    // exception para cuando es un producto nuevo el btn navegue a una pantalla existente
    if (id === 'new') {
        return emptyProduct;
    }

    try {

        const { data } = await productsApi.get<Product>(`/products/${id}`);

        return {
            ...data,
            // modificar el la img para poder recibirla como url completa
            images: data.images.map(img => `${API_URL}/files/product/${img}`)
        };
    } catch (error) {
        throw new Error('No se pudo obtener el producto por ID');
    }

}
