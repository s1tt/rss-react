import { Beer } from '../types/CommonTypes';

interface IPromise {
  status: number;
  data?: Promise<Array<Beer>>;
  message?: string;
}

const checkResponse = async (res: Response): Promise<IPromise> => {
  if (res.ok) {
    return Promise.resolve({ status: res.status, data: res.json() });
  }
  const data = await res.json();
  const errorMessage = `Ошибка: ${res.status} - ${data.message}`;
  return Promise.reject({ status: res.status, message: errorMessage });
};

async function getInitialBeers() {
  const response = await fetch('https://api.punkapi.com/v2/beers');
  return checkResponse(response);
}

async function getBeersByName(request: string) {
  const response = await fetch(
    // `https://api.punkapi.com/v2/beers?beer_name=${beerName}`
    `https://api.punkapi.com/v2/beers?beer_name=${request}`
  );
  return checkResponse(response);
}

async function getBeerById(id: number) {
  const response = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
  return checkResponse(response);
}

export { getBeerById, getBeersByName, getInitialBeers };
