import { createElement, FC, JSX, PropsWithChildren } from 'react';
import styles from './Container.module.scss';

interface ContainerProps extends PropsWithChildren {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

const Container: FC<ContainerProps> = ({ as: Tag = 'div', className, children }) => {
  return createElement(
    Tag,
    {
      className: `${styles.root}${className ? ` ${className}` : ''}`
    },
    children
  );
};

export default Container;
