import { useNavigate } from 'react-router-dom';
import styles from './Page404.module.css';

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.content}>
      <h1>Page not Found</h1>
      <button onClick={() => navigate(-1)}>Назад</button>
    </section>
  );
};

export default Page404;
