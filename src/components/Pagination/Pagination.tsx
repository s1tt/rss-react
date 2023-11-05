import { FC, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.css';
import { IPagination } from './Pagination.props';

const Pagination: FC<IPagination> = ({
  totalCards,
  perPage,
  setCurrentPage,
  currentPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNumbers = useMemo(() => {
    const pages: Array<number> = [];
    for (let i: number = 1; i <= Math.ceil(totalCards / perPage); i++) {
      pages.push(i);
    }
    return pages;
  }, [perPage, totalCards]);

  const changePage = (num: number) => {
    setCurrentPage(num);
    searchParams.set('page', num.toString());
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!pageNumbers.includes(currentPage)) {
      throw new Response('NotFound', { status: 404 });
    }
  }, [currentPage, pageNumbers]);

  return (
    <div className={styles.pagination}>
      {pageNumbers.map((num) => (
        <button
          className={styles.button}
          key={num}
          onClick={() => changePage(num)}
          disabled={currentPage === num}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
