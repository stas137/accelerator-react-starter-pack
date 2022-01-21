import {GuitarsQuery} from '../../types/guitars-query';
import {ChangeEvent, useEffect, useState} from 'react';
import {PRICE_MAX, PRICE_MIN} from '../../utils/const';

type PriceRangeProps = {
  minPrice: number | undefined,
  maxPrice: number | undefined,
  onChange: (params: Partial<GuitarsQuery>) => void,
}


function PriceRange({minPrice, maxPrice, onChange}: PriceRangeProps): JSX.Element {

  const minPriceLocal = Number(minPrice) || PRICE_MIN;
  const maxPriceLocal = Number(maxPrice) || PRICE_MAX;

  const [min, setMin] = useState<number>(minPriceLocal);
  const [max, setMax] = useState<number>(maxPriceLocal);

  useEffect(() => {
    if (minPrice) {
      setMin(minPrice);
    } else {
      setMin(minPriceLocal);
    }

    if (maxPrice) {
      setMax(maxPrice);
    } else {
      setMax(maxPriceLocal);
    }
  }, [minPrice, maxPrice]);

  const handleChangeInputPriceMin = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setMin(minPriceLocal);
    } else {
      setMin(Number(e.target.value));
    }
  };

  const handleChangeInputPriceMax = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === ''){
      setMax(maxPriceLocal);
    } else {
      setMax(Number(e.target.value));
    }
  };

  const handleBlurInputPriceMin = (e: ChangeEvent<HTMLInputElement>) => {
    let price = Number(e.target.value);

    if (price < minPriceLocal || price > maxPriceLocal) {
      price = minPriceLocal;
    }

    setMin(price);
    onChange({ minPrice: price, maxPrice: max} );
  };

  const handleBlurInputPriceMax = (e: ChangeEvent<HTMLInputElement>) => {
    let price = Number(e.target.value);

    if (price > maxPriceLocal || !price || price < 0 || price < min) {
      price = maxPriceLocal;
    }
    setMax(price);
    onChange({ minPrice: min, maxPrice: price} );
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            type="number"
            value={min === minPriceLocal ? '' : min}
            placeholder={minPriceLocal.toString()}
            id="priceMin"
            name="от"
            onBlur={handleBlurInputPriceMin}
            onChange={handleChangeInputPriceMin}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            value={max === maxPriceLocal ? '' : max}
            placeholder={maxPriceLocal.toString()}
            id="priceMax"
            name="до"
            onBlur={handleBlurInputPriceMax}
            onChange={handleChangeInputPriceMax}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default PriceRange;
