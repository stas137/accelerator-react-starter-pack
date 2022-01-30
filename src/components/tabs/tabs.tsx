import {GuitarType} from '../../types/guitars';
import {TabContent} from '../tab-content/tab-content';
import {TabHeader} from '../tab-header/tab-header';

type TabsProps = {
  guitar: GuitarType,
  currentIndexTab: number,
  handlerChangeTab: (tab: string) => void,
}

function Tabs({ guitar, currentIndexTab, handlerChangeTab }: TabsProps ): JSX.Element {

  return (
    <div className="tabs">
      <TabHeader indexTab={0} currentIndexTab={currentIndexTab} titleTab="Характеристики" nameTab="characteristics" handlerChangeTab={handlerChangeTab} />
      <TabHeader indexTab={1} currentIndexTab={currentIndexTab} titleTab="Описание" nameTab="description" handlerChangeTab={handlerChangeTab} />

      <TabContent
        guitar={guitar}
        indexTab={currentIndexTab}
      />
    </div>);
}

export {Tabs};
