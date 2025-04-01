import { Product } from '@/features/products';
import axiosInstance from '@/shared/api/axios';
import { omit } from 'lodash';

export const addToCart = async (postData: Partial<Product>): Promise<Product> => {
  const response = await axiosInstance.put(`/products/${postData.id}`, JSON.stringify(omit(postData, 'id')));
  return response.data;
};
