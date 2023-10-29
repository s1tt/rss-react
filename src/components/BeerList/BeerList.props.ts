import { Beer } from '../../types/CommonTypes';

export type BeerListProps = {
  beers: Array<Beer>;
  updateBeerState: (beers: Array<Beer>) => void;
};
