import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToCart } from '@/features/cart-actions/api/cart-actions';

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });
};
