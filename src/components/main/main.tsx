import CatalogCards from '../catalog-cards/catalog-cards';
import {
  addQueryParams
} from '../../utils/common';
import {Link} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import {useEffect} from 'react';
import Pagination from '../pagination/pagination';
import {GuitarsQuery} from '../../types/guitars-query';
import {fetchGuitarsAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../types/action';
import { DEFAULT_QUERIES } from '../../utils/const';
import {setQueryParams} from '../../store/action';
import {useHistory, useLocation} from 'react-router-dom';
import PriceRange from '../price-range/price-range';
import {
  getErrorGuitars,
  getGuitars,
  getLoadingGuitars,
  getQueryParams,
  getTotalCountGuitars
} from '../../store/guitars-data/selectors';

import CatalogSortOrder from './../catalog-sort-order/catalog-sort-order';
import CatalogSortType from '../catalog-sort-type/catalog-sort-type';
import TypesGuitars from '../types-guitars/types-guitars';
import StringCounts from '../string-counts/string-counts';

const mapStateToProps = (state: State) => ({
  guitars: getGuitars(state),
  total: getTotalCountGuitars(state),
  loading: getLoadingGuitars(state),
  error: getErrorGuitars(state),
  params: getQueryParams(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onLoadGuitars(queryParams: GuitarsQuery) {
    dispatch(fetchGuitarsAction(queryParams));
  },
  onSetParams(queryParams: GuitarsQuery) {
    dispatch(setQueryParams(queryParams));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;


function Main(props: PropsFromRedux):JSX.Element {

  const {guitars, total, loading, error, onLoadGuitars, params, onSetParams} = props;

  const location = useLocation();
  const history = useHistory();

  const handleAddQueryParams = (queries: Partial<GuitarsQuery> = {}) => {

    if (queries._order && !queries._sort) {
      queries._sort = 'price';
    }

    const queryParams: GuitarsQuery = {...DEFAULT_QUERIES, ...addQueryParams(queries, location, history)};

    //queryParams.page = Number(queryParams.page);

    if (typeof queryParams.type === 'string') {
      queryParams.type = [queryParams.type];
    }

    if (typeof queryParams.stringCount === 'string') {
      queryParams.stringCount = [queryParams.stringCount];
    }

    onSetParams(queryParams);
    onLoadGuitars(queryParams);
  };

  /* eslint-disable */
  useEffect(() => {
    handleAddQueryParams();
  }, [onSetParams, onLoadGuitars]);
  /* eslint-enable */

  const handleChangeSort = (newSelectedSort: string) => {
    handleAddQueryParams({ _sort: newSelectedSort });
  };

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
        <div className="catalog">
          <form className="catalog-filter">
            <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>

            <PriceRange
              minPrice={params.minPrice}
              maxPrice={params.maxPrice}
              onChange={handleAddQueryParams}
            />

            <TypesGuitars
              typesGuitars={params.type}
              stringCount={params.stringCount}
              handleAddQueryParams={handleAddQueryParams}
            />

            <StringCounts
              typesGuitars={params.type}
              stringCount={params.stringCount}
              handleAddQueryParams={handleAddQueryParams}
            />

          </form>
          <div className="catalog-sort">
            <h2 className="catalog-sort__title">Сортировать:</h2>

            <CatalogSortType
              sort={params._sort}
              handleChangeSort={handleChangeSort}
            />

            <CatalogSortOrder
              order={params._order}
              handleAddQueryParams={handleAddQueryParams}
            />
          </div>

          <CatalogCards
            guitars={guitars}
            loading={loading}
            error={error}
          />

          <Pagination
            page={params.page}
            perPage={params.perPage}
            totalCount={total}
            onChange={(page: string) => handleAddQueryParams({page})}
          />
        </div>
      </div>
    </main>
  );
}

export {Main};
export default connector(Main);
