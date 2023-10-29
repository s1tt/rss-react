import { Component } from 'react';
import classes from './BeerCard.module.css';
import { BeerCardProps } from './BeerCard.props';
import { BeerCardState } from './BeerCard.state';

export default class BeerCard extends Component<BeerCardProps, BeerCardState> {
  render() {
    return (
      <article className={classes['beer-card']}>
        <div className={classes['img-wrapper']}>
          <img
            className={classes.img}
            src={this.props.img}
            alt={this.props.title}
          />
        </div>
        <h2>{this.props.title}</h2>
        <div>
          <p>ABV: {this.props.abv}</p>
          <p>IBU: {this.props.ibu}</p>
          <p>{this.props.description}</p>
        </div>
      </article>
    );
  }
}
