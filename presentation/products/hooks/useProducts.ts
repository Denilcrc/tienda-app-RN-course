import { getProducts } from "@/core/products/actions/get-products.actions"
import { useInfiniteQuery } from "@tanstack/react-query"


export const useProducts = () => {
  
  
  const productsQuery = useInfiniteQuery({
    queryKey: ["products", 'infinite'], // queryKey identificador unico de la query
    queryFn: ({pageParam}) => getProducts(20, pageParam * 20), // pageParam * 20, pag 1 * 20 = offset 20, pag 2 * 20 = offset 40

    staleTime: 1000 * 60 * 60, // 1 hour, mantiene la data en cache(Fresca) por 1 hora

    initialPageParam: 0, // parametro inicial de la paginacion

    getNextPageParam: (lastPage, allPages) => allPages.length, // obtiene el siguiente parametro de paginacion
  })

  
    return {
    productsQuery,

    //methods
    loadNextPage: () => productsQuery.fetchNextPage(),
  }
}

