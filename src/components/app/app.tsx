import Main from '../main/main';
import {Route, Switch} from 'react-router-dom';
import {AppRoute} from '../../utils/const';
import Product from '../product/product';
import NotFound from '../not-found/not-found';
import Header from '../header/header';
import Footer from '../footer/footer';


function App(): JSX.Element {

  return (
    <div className="wrapper">
      <Header />
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
      <Footer />
    </div>
  );
}

export default App;
