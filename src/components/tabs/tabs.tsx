import {GuitarType} from '../../types/guitars';

type TabsProps = {
  guitar: GuitarType,
  indexTab: number,
  handlerChangeTab: (tab: string) => void,
}

function Tabs({ guitar, indexTab, handlerChangeTab }: TabsProps ): JSX.Element {

  return (
    <div className="tabs">
      <span
        className={ indexTab === 0 ? 'button button--medium tabs__button' : 'button button--black-border button--medium tabs__button' }
        onClick={ () => handlerChangeTab('characteristic') }
      >
        Характеристики
      </span>
      <span
        className={ indexTab === 1 ? 'button button--medium tabs__button' : 'button button--black-border button--medium tabs__button' }
        onClick={ () => handlerChangeTab('description') }
      >
        Описание
      </span>

      {
        indexTab === 1
          ? (
            <div className="tabs__content" id="description">
              <p className="tabs__product-description ">
                {guitar.description}
              </p>
            </div>
          )
          : (
            <div className="tabs__content" id="characteristics">
              <table className="tabs__table">
                <tbody>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Артикул:</td>
                    <td className="tabs__value">{guitar.vendorCode}</td>
                  </tr>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Тип:</td>
                    <td className="tabs__value">{guitar.type}</td>
                  </tr>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Количество струн:</td>
                    <td className="tabs__value">{guitar.stringCount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
      }

    </div>);
}

export {Tabs};
