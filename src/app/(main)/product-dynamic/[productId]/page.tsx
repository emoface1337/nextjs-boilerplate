import React, { Suspense } from 'react';
import { fetchProduct } from '@/features/products/api/products';
import ProductInfo from '@/entities/product/ui/ProductInfo';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getProductQueryKey } from '@/features/products';
import styles from '@/app/(main)/product-static/[productId]/page.module.scss';
import RecommendedProducts from '@/widgets/recommended-products/RecommendedProducts';

export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;

  const queryClient = new QueryClient();
  // const router = useRouter()

  await queryClient.prefetchQuery({
    queryKey: getProductQueryKey(+productId),
    queryFn: () => fetchProduct(+productId)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={styles.product}>
        Product ID : {productId}
        <ProductInfo productId={+productId} />
      </div>
      <Suspense fallback={null}>
        <RecommendedProducts productId={+productId} />
      </Suspense>
    </HydrationBoundary>
  );
}
