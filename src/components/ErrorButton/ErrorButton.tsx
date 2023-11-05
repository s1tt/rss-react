import { FC, useState } from 'react';

const ErrorButton: FC = () => {
  const [neError, setNewError] = useState<boolean>(false);

  const handleClick = (): void => {
    setNewError(true);
  };

  if (neError) {
    throw new Error('I crashed!');
  }

  return (
    <button onClick={handleClick} style={{ position: 'absolute', right: '0' }}>
      Generate an error
    </button>
  );
};

export default ErrorButton;
