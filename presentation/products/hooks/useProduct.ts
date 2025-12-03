import { updateCreateProduct } from "@/core/products/actions/create-update-product.action"
import { getProductById } from "@/core/products/actions/get-product-by-id.actions"
import { Product } from "@/core/products/interfaces/product.interface"
import { useCameraStore } from "@/presentation/store/useCameraStore"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { Alert } from "react-native"


export const useProduct = (productId: string) => {

    const {clearImages} = useCameraStore()
    const queryClient = useQueryClient();
    const productRef = useRef(productId); //en algun momneto puede ser new / uuid

    const productQuery = useQuery({
        queryKey: ["products", productId],
        queryFn: () => getProductById(productId),
        staleTime: 1000 * 60 * 60, // 1 hour
    })

    // mutacion
    const productMutation = useMutation({
        mutationFn: async (data: Product) => updateCreateProduct({
            ...data,
            id: productRef.current,
        }),

        onSuccess(data: Partial<Product>) {

            // mantenemos la ref porque si se cliquea en guardar y el producto es nuevo, y si se vuelve a clicar en guardar se crearia otro producto nuevo
            productRef.current = data.id!;

            clearImages(); //limpiamos las imagenes seleccionadas
            
            // invalidar product query, para que se refresque
            queryClient.invalidateQueries({ queryKey: ["products", 'infinite'] }); //el querykey definido el useProducts
            queryClient.invalidateQueries({ queryKey: ["products", data.id] });

            Alert.alert("Producto guardado", `${data.title} ha sido guardado correctamente`)
        },

        onError() {
            Alert.alert("Error", "No se pudo guardar el producto, intentalo de nuevo")
        },

    })

    // obtener el id del producto en caso de ser nuevo

    return {
        productQuery,
        productMutation,
    }
}
