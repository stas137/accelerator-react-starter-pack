import Main from '../main/main';
import {Route, Switch} from 'react-router-dom';
import {AppRoute} from '../../utils/const';
import Product from '../product/product';
import NotFound from '../not-found/not-found';
import {State} from '../../types/state';
import {NameSpace} from '../../store/root-reducer';
import {connect, ConnectedProps} from 'react-redux';
import Loading from '../loading/loading';

const mapStateToProps = (state: State) => ({
  isDataLoaded: state[NameSpace.Data].isDataLoaded,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function App({isDataLoaded}: PropsFromRedux): JSX.Element {

  if (!isDataLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <Main />
      </Route>
      <Route exact path={AppRoute.Product}>
        <Product />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export {App};
export default connector(App);
