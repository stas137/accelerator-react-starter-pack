import {Link} from 'react-router-dom';

function NotFound():JSX.Element {

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item">
            <Link className="link" to="/">Главная</Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="link" to="/">Каталог</Link>
          </li>
        </ul>
        <div>
          <h1>404. Page not found</h1>
          <p><Link to="/">Вернуться на главную страницу</Link></p>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
