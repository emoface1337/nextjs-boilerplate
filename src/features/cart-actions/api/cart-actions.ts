import { Product } from '@/features/products';
import axiosClient from '@/shared/api/client/axios';
import { omit } from 'lodash';

export const addToCart = async (postData: Partial<Product>): Promise<Product> => {
  const response = await axiosClient.put(`/products/${postData.id}`, JSON.stringify(omit(postData, 'id')));
  return response.data;
};
