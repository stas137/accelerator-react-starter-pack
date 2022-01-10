type PaginationProps = {
  page: number,
  perPage: number,
  totalCount: number,
  onChange: (page: number) => void,
}

function Pagination({page, perPage, totalCount, onChange}: PaginationProps): JSX.Element {

  /* const pageNumber = [];
  const pageCount = Math.ceil(props.guitarsTotalCount / props.guitarsPerPage);

  const portionCount = Math.ceil(pageCount / props.portionSize);
  const currentPortionNumber = Math.ceil(props.currentPage / props.portionSize);
  const [portionNumber, setPortionNumber] = useState<number>(currentPortionNumber);
  const leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
  const rightPortionPageNumber = portionNumber * props.portionSize;*/

  const handleSpanClick = (pageNumber: number) => {
    onChange(pageNumber);
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
          /*pageNumber.filter((page) => (page >= leftPortionPageNumber) && (page <= rightPortionPageNumber)).map((page) => ( props.currentPage === page
            ?
            <li className="pagination__page pagination__page--active" key={page}>
              <span className="link pagination__page-link" >{page}</span>
            </li>
            :
            <li className="pagination__page" key={page}>
              <span className="link pagination__page-link" onClick={() => handleSpanClick(page)} >{page}</span>
            </li>
          ))*/
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
