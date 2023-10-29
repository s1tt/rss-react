import { Component } from 'react';

import './App.css';
import BeerList from './components/BeerList/BeerList.js';
import ErrorButton from './components/ErrorButton/ErrorButton.js';
import SearchSection from './components/SearchSection/SearchSection.js';
import { Beer } from './types/CommonTypes';

type AppState = {
  readonly beers: Array<Beer>;
};

// type AppProps = {};

class App extends Component<Record<never, never>, AppState> {
  constructor(props: Record<never, never>) {
    super(props);
    this.state = {
      beers: [],
    };

    this.updateBeerState = this.updateBeerState.bind(this);
  }

  updateBeerState(beers: Beer[]): void {
    this.setState({ beers });
  }

  render() {
    return (
      <>
        <ErrorButton />
        <SearchSection updateBeerState={this.updateBeerState} />
        <BeerList
          beers={this.state.beers}
          updateBeerState={this.updateBeerState}
        />
      </>
    );
  }
}

export default App;
