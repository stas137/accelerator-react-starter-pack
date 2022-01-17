import {getFillArrayFrom1toN} from '../../utils/common';

type PaginationProps = {
  page: number,
  perPage: number,
  totalCount: number,
  onChange: (page: number) => void,
}

function Pagination({page, perPage, totalCount, onChange}: PaginationProps): JSX.Element {


  const pageCount = Math.ceil(totalCount / perPage);
  const pageNumber = getFillArrayFrom1toN(pageCount);

  const handleSpanClick = (currentPage: number) => {
    onChange(currentPage);
  };

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          page > 1 && (
            <li className="pagination__page pagination__page--prev" id="prev">
              <span
                className="link pagination__page-link"
                onClick={ () => {
                  handleSpanClick(page - 1);
                }}
              >
                Назад
              </span>
            </li>)
        }
        {
          pageNumber.map((item) => item === page
            ? (
              <li className="pagination__page pagination__page--active" key={item}>
                <span className="link pagination__page-link" >{item}</span>
              </li>
            )
            : (
              <li className="pagination__page" key={item}>
                <span className="link pagination__page-link" onClick={() => handleSpanClick(item)}>{item}</span>
              </li>
            ))
        }
        {
          page < totalCount / perPage && (
            <li className="pagination__page pagination__page--next" id="next">
              <span
                className="link pagination__page-link"
                onClick={ () => {
                  handleSpanClick(page + 1);
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
