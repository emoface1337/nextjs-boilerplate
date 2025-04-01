// widgets/header/model/getMenuItems.ts

type MenuItem = {
  id: string;
  href: string;
  label: string;
};

export const mockMenuItems: MenuItem[] = [
  { id: '1', href: '/', label: 'Главная' },
  { id: '2', href: '/catalog/random', label: 'Каталог' },
  { id: '3', href: '/product-dynamic/1', label: 'Продукт димамический' },
  { id: '4', href: '/product-static/2', label: 'Продукт статический' }
];

export async function getMenu() {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockMenuItems;
}
