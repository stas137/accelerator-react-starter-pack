import {TYPES_GUITARS_DATA} from '../../utils/const';
import {getNameTypeGuitar, getTypesForStringCount} from '../../utils/common';
import {GuitarsQuery} from '../../types/guitars-query';

type TypesGuitarsProps = {
  typesGuitars: string[],
  stringCount: string[],
  handleAddQueryParams: (queryParams: Partial<GuitarsQuery>) => void,
};

function TypesGuitars(props: TypesGuitarsProps): JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      {
        TYPES_GUITARS_DATA.map((item) => {
          const checked = props.typesGuitars.includes(item);

          const enabledType = props.stringCount.length
            ? new Set(props.stringCount.map((stringCount) => getTypesForStringCount(stringCount)).flat(1))
            : new Set(TYPES_GUITARS_DATA);

          return (
            <div className="form-checkbox catalog-filter__block-item" key={item}>
              <input
                className="visually-hidden"
                type="checkbox"
                id={item}
                name={item}
                checked={checked}
                disabled={!enabledType.has(item)}
                onChange={() => props.handleAddQueryParams({
                  type: checked ? props.typesGuitars.filter((type) => type !== item) : [...props.typesGuitars, item],
                })}
              />
              <label htmlFor={item}>{getNameTypeGuitar(item)}</label>
            </div>
          );
        })
      }
    </fieldset>
  );
}

export default TypesGuitars;

