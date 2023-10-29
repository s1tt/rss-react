import { Beer } from '../../types/CommonTypes';

export type SearchSectionProps = {
  updateBeerState: (beers: Array<Beer>) => void;
};
