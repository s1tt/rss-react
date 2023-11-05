import { FC, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Beer } from '../../types/CommonTypes';
import { getBeerById } from '../../utils/api';
import Loader from '../Loader/Loader';
import styles from './BeerPage.module.css';
import closeIco from '/close.png';

const BeerPage: FC = () => {
  const [beer, setBeer] = useState<Beer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [closeOutlet, searchParams]: [() => void, URLSearchParams] =
    useOutletContext();

  useEffect(() => {
    const id = Number(searchParams.get('beer'));
    if (id) {
      setIsLoading(true);
      getBeerById(id)
        .then((res) => {
          if (res.data) {
            res.data
              .then((res) => {
                setBeer(res[0]);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [searchParams, setIsLoading]);

  return (
    <>
      <div className={styles.content}>
        {isLoading ? (
          <Loader className={styles.loader} />
        ) : (
          beer && (
            <>
              <div className={styles['image-wrapper']}>
                <img src={beer.image_url} alt={beer.name} />
              </div>
              <h1>{beer.name}</h1>
              <div className={styles.description}>
                <p className={styles.details}>
                  IBU: <span className={styles['details-var']}>{beer.ibu}</span>
                </p>
                <p className={styles.details}>
                  ABV: <span className={styles['details-var']}>{beer.abv}</span>
                </p>
                <p className={styles.details}>
                  Description:{' '}
                  <span className={styles['details-var']}>
                    {beer.description}
                  </span>
                </p>
                <p className={styles.details}>
                  Boil volume:{' '}
                  <span className={styles['details-var']}>
                    {beer.boil_volume.value} {beer.boil_volume.unit}
                  </span>
                </p>
                <div className={styles.details}>
                  Food pairing:{' '}
                  <ul className={styles['details-var']}>
                    {beer.food_pairing.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.details}>
                  Brewers tips:{' '}
                  <p className={styles['details-var']}>{beer.brewers_tips}</p>
                </div>

                <div className={styles.details}>
                  Ingredients:{' '}
                  <ul className={styles['details-var']}>
                    {Object.entries(beer.ingredients).map(([name, value]) => (
                      <li key={name}>
                        {name}:{' '}
                        {typeof value === 'string' ? (
                          value
                        ) : (
                          <ul>
                            {value.map((item) => (
                              <li
                                key={
                                  item.name +
                                  item.add +
                                  item.attribute +
                                  item.amount.value
                                }
                              >
                                {item.name}: add{' '}
                                {item.add ? ` on ${item.add}` : item.add}{' '}
                                {item.amount.value} {item.amount.unit}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className={styles.details}>
                  Contributed by:{' '}
                  <span className={styles['details-var']}>
                    {beer.contributed_by}
                  </span>
                </p>
                <p className={styles.details}>
                  First brewed:{' '}
                  <span className={styles['details-var']}>
                    {beer.first_brewed}
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={closeOutlet}
                className={styles.close}
                // style={{ width: '13px', height: '13px' }}
              >
                <img
                  src={closeIco}
                  alt="close button"
                  className={styles['close-ico']}
                />
              </button>
            </>
          )
        )}
      </div>
    </>
  );
};

export default BeerPage;
