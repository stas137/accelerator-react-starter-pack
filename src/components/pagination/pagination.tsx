import {useHistory, useLocation} from 'react-router-dom';
import {useState} from 'react';

type PaginationProps = {
  currentPage: number,
  guitarsPerPage: number,
  guitarsTotalCount: number,
  portionSize: number,
}

function Pagination(props: PaginationProps): JSX.Element {

  const location = useLocation();
  const history = useHistory();

  const pageNumber = [];
  const pageCount = Math.ceil(props.guitarsTotalCount / props.guitarsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    pageNumber.push(i);
  }

  const portionCount = Math.ceil(pageCount / props.portionSize);
  const currentPortionNumber = Math.ceil(props.currentPage / props.portionSize);
  const [portionNumber, setPortionNumber] = useState<number>(currentPortionNumber);
  const leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
  const rightPortionPageNumber = portionNumber * props.portionSize;

  /* eslint-disable no-console */
  console.log('portionNumber = ', portionNumber, leftPortionPageNumber);
  console.log(rightPortionPageNumber);
  /* eslint-enable no-console */

  const handleSpanClick = (page: number) => {
    const params = new URLSearchParams(location.search);

    if (page !== 1) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }

    history.push(`?${params}`);
  };

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          portionNumber > 1 && (
            <li className="pagination__page pagination__page--prev" id="prev">
              <span
                className="link pagination__page-link"
                onClick={ () => {
                  setPortionNumber(portionNumber - 1);
                  handleSpanClick((portionNumber - 1) * props.portionSize - 1);
                }}
              >
                Назад
              </span>
            </li>)
        }
        {
          pageNumber.filter((page) => (page >= leftPortionPageNumber) && (page <= rightPortionPageNumber)).map((page) => ( props.currentPage === page
            ?
            <li className="pagination__page pagination__page--active" key={page}>
              <span className="link pagination__page-link" >{page}</span>
            </li>
            :
            <li className="pagination__page" key={page}>
              <span className="link pagination__page-link" onClick={() => handleSpanClick(page)} >{page}</span>
            </li>
          ))
        }
        {
          portionNumber < portionCount && (
            <li className="pagination__page pagination__page--next" id="next">
              <span
                className="link pagination__page-link"
                onClick={ () => {
                  setPortionNumber(portionNumber + 1);
                  handleSpanClick(portionNumber * props.portionSize + 1);
                }}
              >
                Далее
              </span>
            </li>)
        }
      </ul>
    </div>
  );
}

export default Pagination;
