import { useState } from 'react';

import BeerList from '../../components/BeerList/BeerList.js';
import SearchSection from '../../components/SearchSection/SearchSection.js';
import { Beer } from '../../types/CommonTypes';
import './App.css';

const App = () => {
  const [beers, setBeers] = useState<Array<Beer>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log('App');

  return (
    <>
      <SearchSection updateBeerState={setBeers} setIsLoading={setIsLoading} />
      <BeerList beers={beers} isLoading={isLoading} />
    </>
  );
};

export default App;
