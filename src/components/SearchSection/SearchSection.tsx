import { FC, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getBeersByName, getInitialBeers } from '../../utils/api';
import ErrorButton from '../ErrorButton/ErrorButton';
import classes from './SearchSection.module.css';
import { SearchSectionProps } from './SearchSection.props';

const SearchSection: FC<SearchSectionProps> = ({
  updateBeerState,
  setIsLoading,
}) => {
  const [searchRequest, setSearchRequest] = useState<string>(
    localStorage.getItem('searchRequest') || ''
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchInitialBeers = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getInitialBeers();
      if (res.status === 200) {
        const data = await res.data;
        if (data) {
          updateBeerState(data);
          localStorage.setItem('beers', JSON.stringify(data));
        }
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, updateBeerState]);

  const fetchBeersByName = useCallback(
    async (beerName: string) => {
      try {
        setIsLoading(true);
        const res = await getBeersByName(beerName);
        if (res.status === 200) {
          localStorage.setItem('searchRequest', beerName);
          const data = await res.data;
          if (data) {
            updateBeerState(data);
            localStorage.setItem('beers', JSON.stringify(data));
          }
        }
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, updateBeerState]
  );

  useEffect(() => {
    if (!searchParams.has('beer')) {
      if (searchParams.has('beer_name')) {
        const searchQuery = searchParams.get('beer_name');
        if (searchQuery) {
          localStorage.setItem('searchRequest', searchQuery);
          fetchBeersByName(searchQuery);
          setSearchRequest(searchQuery);
        }
      } else {
        const searchRequestLocal = localStorage.getItem('searchRequest');
        if (searchRequestLocal) {
          searchParams.set('beer_name', searchRequestLocal);
          setSearchParams(searchParams);
        }
        fetchInitialBeers();
      }
    }
  }, [fetchInitialBeers, fetchBeersByName, searchParams, setSearchParams]);

  console.log('SearchSection');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchRequest(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmedSearchRequest = searchRequest.replace(/\s+/g, '_');

    if (trimmedSearchRequest) {
      searchParams.set('page', '1');
      searchParams.set('beer_name', trimmedSearchRequest);
      setSearchParams(searchParams);
      fetchBeersByName(trimmedSearchRequest);
    }
  };

  return (
    <section className={classes['search-section']}>
      <form className={classes.form} onSubmit={onSubmit}>
        <label className={classes.label} htmlFor="search-request">
          <input
            className={classes.input}
            type="search"
            name="search-request"
            id="search-request"
            value={searchRequest}
            onChange={handleInputChange}
          />
        </label>
        <button className={classes['search-btn']} type="submit">
          Search
        </button>
      </form>
      <ErrorButton />
    </section>
  );
};

export default SearchSection;
