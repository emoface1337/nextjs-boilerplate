import axiosInstance from '@/shared/api/axios';
import { Product, ProductsRes } from '@/features/products/models/product';

export const fetchProducts = async (): Promise<ProductsRes> => {
  const response = await axiosInstance.get('/products');
  return response.data;
};

export const fetchProduct = async (id: Product['id']): Promise<Product> => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

