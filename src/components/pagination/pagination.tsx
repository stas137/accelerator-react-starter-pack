import {getFillArrayFrom1toN} from '../../utils/common';

type PaginationProps = {
  page: string,
  perPage: number,
  totalCount: number,
  onChange: (page: string) => void,
}

function Pagination({page, perPage, totalCount, onChange}: PaginationProps): JSX.Element {


  const pageCount = Math.ceil(totalCount / perPage);
  const pageNumber = getFillArrayFrom1toN(pageCount);

  const handleSpanClick = (currentPage: number) => {
    onChange(String(currentPage));
  };

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          Number(page) > 1 && (
            <li className="pagination__page pagination__page--prev" id="prev">
              <span
                className="link pagination__page-link"
                onClick={ () => {
                  handleSpanClick(Number(page) - 1);
                }}
              >
                Назад
              </span>
            </li>)
        }
        {
          pageNumber.map((item) => item === Number(page)
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
          Number(page) < totalCount / perPage && (
            <li className="pagination__page pagination__page--next" id="next">
              <span
                className="link pagination__page-link"
                onClick={ () => {
                  handleSpanClick(Number(page) + 1);
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
