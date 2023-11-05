import cn from 'classnames';
import { FC } from 'react';
import styles from './Loader.module.css';

type Loader = {
  className?: string;
};

const Loader: FC<Loader> = ({ className }) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
