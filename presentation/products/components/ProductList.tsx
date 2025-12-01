import { Product } from "@/core/products/interfaces/product.interface";
import { useQueryClient } from '@tanstack/react-query';
import { useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
  loadNextPage: () => void;
}

const ProductList = ({ products, loadNextPage }: Props) => {

  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const onPullToRefresh = async() => { //vacia el cache y carga la primera pagina de nuevo
    setIsRefreshing(true);

    await new Promise( resolve => setTimeout( resolve, 500 ) ); //simular tiempo de espera porque en local es muy rapido 
    queryClient.invalidateQueries({ //al invalidar la query se vacia el cache y se vuelve a realizar la peticion
      queryKey: ['products', 'infinite'], // la query que queremos invalidar
    })

    setIsRefreshing(false);
    
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => <ProductCard product={item} />}

      onEndReached={loadNextPage}
      onEndReachedThreshold={0.8} //al llegar al 80% de la lista se carga mas

      showsHorizontalScrollIndicator={false}

      refreshControl={ // para el pull to refresh (deslizar hacia abajo para recargar)
        <RefreshControl 
          refreshing={isRefreshing}
          onRefresh={onPullToRefresh}
        />
      }
    />
  );
};

export default ProductList;
