import React, { CSSProperties, FC, ReactNode } from 'react';
import '@/shared/ui/primitives/Tile/Tile.scss';

interface TileProps {
  children: ReactNode;
  columns: number[];
  gap?: number | string;
  className?: string;
  style?: CSSProperties;
}

const Tile: FC<TileProps> = ({ children, columns, className = '', ...props }) => {
  const classNames = ['tile', className];

  // Применяем последнее значение для всех оставшихся брейкпоинтов
  const extendedColumns = [...columns];
  while (extendedColumns.length < 4) {
    extendedColumns.push(columns[columns.length - 1]);
  }

  extendedColumns.forEach((col, index) => {
    if (col > 0) {
      classNames.push(`tile--cols-${index}-${col}`);
    }
  });

  return (
    <div {...props} className={classNames.join(' ')}>
      {children}
    </div>
  );
};

export default Tile;
