import Card from '../card/card';
import {GuitarsType} from '../../types/guitars';

type CatalogCardsPropsType = {
  guitars: GuitarsType,
}

function CatalogCards({guitars}: CatalogCardsPropsType):JSX.Element {
  return (
    <div className="cards catalog__cards">
      {
        guitars.map((guitar) => <Card key={guitar.id} guitar={guitar}/>)
      }
    </div>
  );
}

export default CatalogCards;
