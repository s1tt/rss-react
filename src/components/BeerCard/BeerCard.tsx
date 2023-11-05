import cn from 'classnames';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './BeerCard.module.css';
import { BeerCardProps } from './BeerCard.props';

const BeerCard: FC<BeerCardProps> = ({
  id,
  title,
  img,
  description,
  setIsOutletOpened,
  isOutletOpened,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onClick = () => {
    setIsOutletOpened(true);
    searchParams.set('beer', id.toString());
    setSearchParams(searchParams);
  };

  return (
    <article
      className={cn(styles['beer-card'], {
        [styles.inactive]: isOutletOpened,
      })}
      onClick={onClick}
    >
      <div className={styles['beer-card-wrapper']}>
        <div className={styles['img-wrapper']}>
          <img className={styles.img} src={img} alt={title} />
        </div>
        <div className={styles.info}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </article>
  );
};

export default BeerCard;
