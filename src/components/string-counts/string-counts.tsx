import {STRING_COUNTS_DATA} from '../../utils/const';
import {getStringCountsForTypes} from '../../utils/common';
import FilterElementString from '../filter-element-string/filter-element-string';
import {GuitarsQuery} from '../../types/guitars-query';

type StringCountsProps = {
  typesGuitars: string[],
  stringCount: string[],
  handleAddQueryParams: (queryParams: Partial<GuitarsQuery>) => void,
};

function StringCounts(props: StringCountsProps): JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      {
        STRING_COUNTS_DATA.map((item) => {
          const checked = props.stringCount.includes(item);

          const enabledStringCount = props.typesGuitars.length
            ? new Set(props.typesGuitars.map((type) => getStringCountsForTypes(type)).flat(1))
            : new Set(STRING_COUNTS_DATA);

          return (
            <FilterElementString
              key={item}
              item={item}
              checked={checked}
              disabled={!enabledStringCount.has(item)}
              handleInputStringsChange={() => props.handleAddQueryParams({
                stringCount: checked ? props.stringCount.filter((stringCount) => stringCount !== item) : [...props.stringCount, item],
              })}
            />
          );
        })
      }
    </fieldset>
  );
}

export default StringCounts;
