import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import BeerCard from '../BeerCard/BeerCard.js';
import Loader from '../Loader/Loader.js';
import Pagination from '../Pagination/Pagination.js';
import styles from './BeerList.module.css';
import { BeerListProps } from './BeerList.props.js';
import SelectPerPage from './SelectPerPage/SelectPerPage.js';

const BeerList: FC<BeerListProps> = ({ beers, isLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(9);
  const offset = (currentPage - 1) * perPage;
  const [isOutletOpened, setIsOutletOpened] = useState(false);

  useEffect(() => {
    if (searchParams.has('page')) {
      const paramCurrentPage = Number(searchParams.get('page'));
      if (paramCurrentPage) {
        setCurrentPage(paramCurrentPage);
      }
    } else {
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    setIsOutletOpened(false);
  }, [isLoading]);

  useEffect(() => {
    if (searchParams.has('page')) {
      const page = Number(searchParams.get('page'));
      if (page) {
        setCurrentPage(page);
      }
    }
    if (searchParams.has('beer')) {
      setIsOutletOpened(true);
    }
  }, [searchParams]);

  console.log('BeerList');

  const closeOutlet = () => {
    if (searchParams.has('beer')) {
      searchParams.delete('beer');
      setSearchParams(searchParams);
      setIsOutletOpened(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (beers.length === 0) {
    return <h1>Nothing found. Enter another query</h1>;
  }

  return (
    <section className={styles.main}>
      <SelectPerPage
        perPage={perPage}
        setPerPage={setPerPage}
        totalCards={beers.length}
      />
      <div className={styles.beers}>
        <div
          className={cn(styles.content, {
            [styles.inactive]: isOutletOpened,
          })}
          onClick={isOutletOpened ? closeOutlet : undefined}
        >
          <div className={styles.list}>
            {beers.slice(offset, offset + perPage).map((i) => (
              <BeerCard
                key={i.id}
                id={i.id}
                title={i.name}
                img={i.image_url}
                description={i.description}
                setIsOutletOpened={setIsOutletOpened}
                isOutletOpened={isOutletOpened}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPage={perPage}
            totalCards={beers.length}
          />
        </div>
        {isOutletOpened && <Outlet context={[closeOutlet, searchParams]} />}
      </div>
    </section>
  );
};

export default BeerList;
