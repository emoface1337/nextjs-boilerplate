import React, { Suspense } from 'react';
import { fetchProduct, fetchProducts } from '@/features/products/api/products';
import ProductInfo from '@/entities/product/ui/ProductInfo';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getProductQueryKey } from '@/features/products';
import styles from '@/app/(main)/product-static/[productId]/page.module.scss';
import RecommendedProducts from '@/widgets/recommended-products/RecommendedProducts';
import Loading from '@/app/(main)/product-static/[productId]/loading';

export const revalidate = 3600; // ревалидируем страницу каждый час, логику ревалидации читать в доке

export async function generateStaticParams() {
  const productsRes = await fetchProducts();

  return productsRes.products.map((product) => ({
    productId: `${product.id}`
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: getProductQueryKey(+productId),
    queryFn: () => fetchProduct(+productId)
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className={styles.product}>
          Product ID : {productId}
          <ProductInfo productId={+productId} />
        </div>
      </HydrationBoundary>
      <Suspense fallback={<Loading />}>
        <RecommendedProducts productId={+productId} />
      </Suspense>
    </>
  );
}
