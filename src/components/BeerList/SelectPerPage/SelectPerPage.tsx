import { ChangeEvent, FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './SelectPerPage.module.css';
import { ISelectPerPage } from './SelectPerPage.props';

const SelectPerPage: FC<ISelectPerPage> = ({
  setPerPage,
  totalCards,
  perPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has('elements')) {
      const elements = Number(searchParams.get('elements'));
      if (elements) {
        setPerPage(elements);
      }
    } else {
      searchParams.set('elements', perPage.toString());
      setSearchParams(searchParams);
    }
  }, [perPage, searchParams, setSearchParams, setPerPage]);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    searchParams.set('elements', value);
    setSearchParams(searchParams);
    setPerPage(Number(value));
  };

  return (
    <label htmlFor="perPage" className={styles.label}>
      <p>
        Elements on the page:{' '}
        <span className={styles.count}>
          {totalCards > perPage ? perPage : totalCards}
        </span>
      </p>
      <select
        defaultValue={'DEFAULT'}
        className={styles.select}
        name="perPage"
        id="perPage"
        onChange={(e) => onChange(e)}
      >
        <option className={styles.option} value="DEFAULT" disabled>
          Select the number of elements
        </option>
        <option className={styles.option} value="9" disabled={9 === perPage}>
          9
        </option>
        <option className={styles.option} value="21" disabled={21 === perPage}>
          21
        </option>
        <option
          className={styles.option}
          value={totalCards}
          disabled={totalCards === perPage}
        >
          all
        </option>
      </select>
    </label>
  );
};

export default SelectPerPage;
