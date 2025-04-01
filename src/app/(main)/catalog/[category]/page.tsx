import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchProducts } from '@/features/products/api/products';
import ProductGrid from '@/widgets/products-grid/ProductGrid';

export default async function ProductsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductGrid />
    </HydrationBoundary>
  );
}
