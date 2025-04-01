import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchProducts } from '@/features/products/api/products';
import ProductGrid from '@/widgets/products-grid/ProductGrid';
import { getProductsQueryKey } from '@/features/products';

export default async function ProductsPage({ params }: { params: Promise<{ category: string }> }) {
  const queryClient = new QueryClient();

  const { category } = await params;

  await queryClient.prefetchQuery({
    queryKey: getProductsQueryKey(category),
    queryFn: () => fetchProducts({})
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductGrid />
    </HydrationBoundary>
  );
}
