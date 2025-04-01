'use client';
import React, { FC } from 'react';
import { useAddToCart } from '@/features/cart-actions/hooks/use-cart-actions';
import { Product } from '@/features/products';

interface Props {
  productId: Product['id'];
}

const AddToCart: FC<Props> = ({ productId }) => {
  const { mutate: addToCart } = useAddToCart();

  return (
    <div>
      <button onClick={() => addToCart({ title: 'New Post', brand: 'New Brand', id: productId })}>
        Add to Cart (title: &#39;Product&#39;, brand: &#39;Brand&#39;, id {productId})
      </button>
    </div>
  );
};

export default AddToCart;
