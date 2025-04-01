import styles from './Menu.module.scss';
import { getMenu } from '@/widgets/header/model/getMenu';
import Link from 'next/link';

export async function Menu() {
  const menuItems = await getMenu(); // Запрос на сервере

  return (
    <nav className={styles.menu}>
      <ul className={styles.menu__list}>
        {menuItems.map((item) => (
          <li key={item.id} className={`${styles.menuItem}`}>
            <Link href={item.href} className={styles.menuItem__link}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
