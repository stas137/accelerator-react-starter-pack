import {LIST_OPTIONS} from '../../utils/const';
import {getNameSort} from '../../utils/common';

type CatalogSortTypeProps = {
  sort?: string,
  handleChangeSort: (newSort: string) => void,
};

function CatalogSortType(props: CatalogSortTypeProps): JSX.Element {
  return (
    <div className="catalog-sort__type" data-testid="catalog-sort__type">
      {
        LIST_OPTIONS.map((item) => item === props.sort
          ? (
            <button
              className="catalog-sort__type-button catalog-sort__type-button--active"
              aria-label={item}
              tabIndex={-1}
              key={item}
            >
              {getNameSort(item)}
            </button>
          )
          : (
            <button
              className="catalog-sort__type-button"
              aria-label={item}
              key={item}
              onClick={() => props.handleChangeSort(item)}
            >
              {getNameSort(item)}
            </button>
          ),
        )
      }

    </div>
  );
}

export default CatalogSortType;
