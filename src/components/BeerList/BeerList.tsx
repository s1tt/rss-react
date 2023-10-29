import { Component } from 'react';
import { getInitialBeers } from '../../utils/api.js';
import BeerCard from '../BeerCard/BeerCard.js';
import Loader from '../Loader/Loader.js';
import { BeerListProps } from './BeerList.props.js';
import { BeerListState } from './BeerList.state.js';

export default class BeerList extends Component<BeerListProps, BeerListState> {
  constructor(props: BeerListProps) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    const localBeers: string | null = localStorage.getItem('beers');
    if (!localBeers) {
      getInitialBeers()
        .then((res) => {
          if (res.data) {
            res.data
              .then((data) => {
                this.props.updateBeerState(data);
                localStorage.setItem('beers', JSON.stringify(data));
              })
              .catch((e) => console.log(e));
          }
        })
        .catch((e) => console.log(e))
        .finally(() => this.setState({ isLoading: false }));
    } else {
      this.props.updateBeerState(JSON.parse(localBeers));
      this.setState({ isLoading: false });
    }
  }
  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }

    if (this.props.beers.length === 0) {
      return <h1>Nothing found. Enter another query</h1>;
    }

    return (
      <section>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
          }}
        >
          {this.props.beers.map((i) => (
            <BeerCard
              key={i.id}
              title={i.name}
              img={i.image_url}
              abv={i.abv}
              ibu={i.ibu}
              description={i.description}
            />
          ))}
        </div>
      </section>
    );
  }
}
