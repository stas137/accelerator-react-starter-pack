import {GuitarType} from '../../types/guitars';
import {Description} from '../description/description';
import {Characteristics} from '../characteristics/characteristics';

type GetTabProps = {
  guitar: GuitarType,
  indexTab: number,
}

function TabContent({guitar, indexTab}: GetTabProps): JSX.Element {
  switch (indexTab) {
    case 0:
      return <Characteristics guitar={guitar}/>;
    case 1:
      return <Description guitar={guitar}/>;
    default:
      return <Characteristics guitar={guitar}/>;
  }
}

export {TabContent};
