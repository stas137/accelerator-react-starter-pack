import Card from '../card/card';
import {GuitarsType} from '../../types/guitars';

type CatalogCardsPropsType = {
  guitars: GuitarsType,
  loading: boolean,
  error: boolean,
}

function CatalogCards({guitars, loading, error}: CatalogCardsPropsType):JSX.Element {

  if (loading) {
    return (
      <div className="cards catalog__cards">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="cards catalog__cards">
        Error loading. Try later
      </div>
    );
  }

  return (
    <div className="cards catalog__cards">
      {
        guitars.map((guitar) => <Card key={guitar.id} guitar={guitar}/>)
      }
    </div>
  );
}

export default CatalogCards;
