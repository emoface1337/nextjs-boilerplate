'use client'
import React, { FC } from 'react';
import { Product, useProducts } from '@/features/products';
import LoadingIndicator from '@/shared/ui/Loading/LoadingIndicator';

interface Props {
  productId: Product['id'];
}

const RecommendedProducts: FC<Props> = ({ productId }) => {
  const { data: productsRes, isLoading, error } = useProducts();

  if (isLoading) return <LoadingIndicator />;
  if (error) return <div>Error loading posts</div>;
  if (!productsRes) return null;

  return (
    <div>
      Полка рекомендации для продукта без SSR - ID: {productId}
    </div>
  );
};

export default RecommendedProducts;