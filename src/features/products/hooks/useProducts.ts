import { fetchProduct, fetchProducts } from '@/features/products/api/products';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/features/products';

const getProductsQueryKey = () => {
  // return ['products', ...какие-то опции по фильтрации, сортировке и т.д.]
  return ['products'];
};

export const getProductQueryKey = (id: Product['id']) => {
  // return ['products', ...какие-то опции по фильтрации, сортировке и т.д.]
  return ['products', id];
};

export const useProducts = () => {
  return useQuery({
    queryKey: getProductsQueryKey(),
    queryFn: fetchProducts
  });
};

export const useProduct = (id: Product['id']) => {
  return useQuery({
    queryKey: getProductQueryKey(id),
    queryFn: () => fetchProduct(id)
  });
};
