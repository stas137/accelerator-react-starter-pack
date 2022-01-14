import {GuitarsQuery} from '../../types/guitars-query';

type CatalogSortOrderProps = {
  order?: 'asc' | 'desc';
  handleAddQueryParams: (queries: Partial<GuitarsQuery>) => void,
};

function CatalogSortOrder(props: CatalogSortOrderProps): JSX.Element {

  if (props.order) {
    return props.order === 'asc'
      ? (
        <div className="catalog-sort__order" data-testid="catalog-sort__order">
          <button className="catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active" aria-label="По возрастанию" tabIndex={-1} >
          </button>
          <button className="catalog-sort__order-button catalog-sort__order-button--down" aria-label="По убыванию"
            onClick={() => props.handleAddQueryParams({ _order: 'desc' })}
          >
          </button>
        </div>
      )
      : (
        <div className="catalog-sort__order" data-testid="catalog-sort__order">
          <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию" tabIndex={-1}
            onClick={() => props.handleAddQueryParams({ _order: 'asc' })}
          >
          </button>
          <button className="catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active" aria-label="По убыванию">
          </button>
        </div>
      );
  }

  return (
    <div className="catalog-sort__order" data-testid="catalog-sort__order">
      <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию" tabIndex={-1}
        onClick={() => props.handleAddQueryParams({ _order: 'asc' })}
      >
      </button>
      <button className="catalog-sort__order-button catalog-sort__order-button--down" aria-label="По убыванию" tabIndex={-1}
        onClick={() => props.handleAddQueryParams({ _order: 'desc' })}
      >
      </button>
    </div>
  );

}

export default CatalogSortOrder;
