'use client';
import React, { FC } from 'react';
import Tile from '@/shared/ui/primitives/Tile/Tile';
import { useProducts } from '@/features/products';
import styles from '@/widgets/products-grid/ProductGrid.module.scss';

const ProductGrid: FC = () => {
  const { data: productsRes, isLoading, error } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;
  if (!productsRes) return null;

  return (
    <>
      <h1>Products</h1>
      <div className={styles.grid}>
        <Tile columns={[2, 2, 4]}>
          {productsRes.products.map((product) => (
            <div key={product.id}>product</div>
          ))}
        </Tile>
      </div>
    </>
  );
};

export default ProductGrid;
