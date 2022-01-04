import {Link} from 'react-router-dom';

type PaginationProps = {
  currentPage: number,
  guitarsPerPage: number,
  guitarsTotalCount: number,
  changePage: (pageNumber: number) => void,
  nextPage: () => void,
}

function Pagination(props: PaginationProps): JSX.Element {

  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(props.guitarsTotalCount / props.guitarsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          pageNumber.map((page) => (page === props.currentPage
            ?
            <li className="pagination__page pagination__page--active" key={page}>
              <Link className="link pagination__page-link" to="/">{page}</Link>
            </li>
            :
            <li className="pagination__page" key={page}>
              <Link className="link pagination__page-link" to="/" onClick={ () => props.changePage(page) }>{page}</Link>
            </li>
          ))
        }
        <li className="pagination__page pagination__page--next" id="next">
          <Link className="link pagination__page-link" to="/" onClick={ () => props.nextPage() } >Далее</Link>
        </li>
        {/*<li className="pagination__page pagination__page--active">
          <a className="link pagination__page-link" href="1">1</a>
        </li>
        <li className="pagination__page">
          <a className="link pagination__page-link" href="2">2</a>
        </li>
        <li className="pagination__page">
          <a className="link pagination__page-link" href="3">3</a>
        </li>
        <li className="pagination__page pagination__page--next" id="next">
          <a className="link pagination__page-link" href="2">Далее</a>
        </li>*/}
      </ul>
    </div>
  );
}

export default Pagination;
