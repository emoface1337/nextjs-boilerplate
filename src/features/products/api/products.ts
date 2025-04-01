import axiosClient from '@/shared/api/client/axios';
import { Product, ProductsRequest, ProductsResponse } from '@/features/products/models/product';

export const fetchProducts = async ({}: ProductsRequest): Promise<ProductsResponse> => {
  const response = await axiosClient.get('/products');
  return response.data;
};

export const fetchProduct = async (id: Product['id']): Promise<Product> => {
  const response = await axiosClient.get(`/products/${id}`);
  return response.data;
};
