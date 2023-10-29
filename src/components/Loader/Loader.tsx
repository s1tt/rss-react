import { Component } from 'react';
import classes from './Loader.module.css';

class Loader extends Component<Record<never, never>, Record<never, never>> {
  render() {
    return (
      <>
        <div className={classes.loader}></div>
      </>
    );
  }
}

export default Loader;
