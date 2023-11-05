import { createBrowserRouter } from 'react-router-dom';
import App from '../components/App/App';
import BeerPage from '../components/BeerPage/BeerPage';
import Page404 from '../components/Page404/Page404';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        path: '/',
        element: <BeerPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Page404 />,
  },
]);
