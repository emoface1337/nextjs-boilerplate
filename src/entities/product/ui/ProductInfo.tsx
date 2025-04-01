'use client';
import React, { FC } from 'react';
import { Product, useProduct } from '@/features/products';
import AddToCart from '@/features/cart-actions/ui/AddToCart';

interface Props {
  productId: Product['id'];
}

const ProductInfo: FC<Props> = ({ productId }) => {
  const { data: product } = useProduct(productId);

  return (
    <div>
      <div>Product Title {product?.title}</div>
      <div>Product Brand {product?.brand}</div>
      {product?.id && <AddToCart productId={product.id} />}
    </div>
  );
};

export default ProductInfo;
