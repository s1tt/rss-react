import { Component } from 'react';

class ErrorButton extends Component<
  Record<never, never>,
  { newError: boolean }
> {
  constructor(props: Record<never, never>) {
    super(props);
    this.state = {
      newError: false,
    };
  }

  handleClick = (): void => {
    this.setState({ newError: true });
  };

  render() {
    if (this.state.newError) {
      throw new Error('I crashed!');
    }
    return <button onClick={this.handleClick}>Generate an error</button>;
  }
}

export default ErrorButton;
