import { Component } from 'react';
import { getBeersByName } from '../../utils/api';
import classes from './SearchSection.module.css';
import { SearchSectionProps } from './SearchSection.props';
import { SearchSectionState } from './SearchSection.state';

export default class SearchSection extends Component<
  SearchSectionProps,
  SearchSectionState
> {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;

  constructor(props: SearchSectionProps) {
    super(props);
    this.state = {
      searchRequest: '',
    };

    this.handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      this.setState({ searchRequest: e.target.value });
    };

    this.onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      localStorage.setItem(
        'searchRequest',
        JSON.stringify(this.state.searchRequest)
      );
      getBeersByName(this.state.searchRequest).then((res) => {
        if (res.data) {
          res.data.then((data) => {
            console.log(data);
            this.props.updateBeerState(data);
            localStorage.setItem('beers', JSON.stringify(data));
          });
        }
      });
    };
  }

  componentDidMount(): void {
    const LocalSearchRequest: string | null =
      localStorage.getItem('searchRequest');
    if (LocalSearchRequest) {
      this.setState({ searchRequest: JSON.parse(LocalSearchRequest) });
    }
  }

  render() {
    return (
      <section className={classes['search-section']}>
        <form className={classes.form} onSubmit={this.onSubmit}>
          <label className={classes.label} htmlFor="search-request">
            <input
              className={classes.input}
              type="text"
              name="search-request"
              id="search-request"
              value={this.state.searchRequest}
              onChange={this.handleInputChange}
            />
          </label>
          <button className={classes['search-btn']} type="submit">
            Search
          </button>
        </form>
      </section>
    );
  }
}
