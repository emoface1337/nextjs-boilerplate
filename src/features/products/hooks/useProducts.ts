import { fetchProduct, fetchProducts } from '@/features/products/api/products';
import { useQuery } from '@tanstack/react-query';
import { Product, ProductsRequest } from '@/features/products';

export const getProductsQueryKey = (...args: (string | undefined)[]) => {
  // return ['products', ...какие-то опции по фильтрации, сортировке и т.д.]
  return ['products', ...args];
};

export const getProductQueryKey = (id: Product['id']) => {
  // return ['products', ...какие-то опции по фильтрации, сортировке и т.д.]
  return ['products', id];
};

export const useProducts = ({ category }: ProductsRequest) => {
  return useQuery({
    queryKey: getProductsQueryKey(category),
    queryFn: () => fetchProducts({})
  });
};

export const useRecommendedProducts = (id: Product['id']) => {
  return useQuery({
    queryKey: ['recommendedProducts', id],
    queryFn: () => fetchProducts({})
  });
};

export const useProduct = (id: Product['id']) => {
  return useQuery({
    queryKey: getProductQueryKey(id),
    queryFn: () => fetchProduct(id)
  });
};
