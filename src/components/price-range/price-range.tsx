import {GuitarsQuery} from '../../types/guitars-query';
import {ChangeEvent, useEffect, useState} from 'react';
import {PRICE_MAX, PRICE_MIN} from '../../utils/const';

type PriceRangeProps = {
  minPrice: number | undefined,
  maxPrice: number | undefined,
  onChange: (params: Partial<GuitarsQuery>) => void,
}


function PriceRange({minPrice, maxPrice, onChange}: PriceRangeProps): JSX.Element {

  const [min, setMin] = useState<number>(Number(minPrice) || PRICE_MIN);
  const [max, setMax] = useState<number>(Number(maxPrice) || PRICE_MAX);

  useEffect(() => {
    if (minPrice) {
      setMin(minPrice);
    }

    if (maxPrice) {
      setMax(maxPrice);
    }
  }, [minPrice, maxPrice]);

  const handleChangeInputPriceMin = (e: ChangeEvent<HTMLInputElement>) => {
    setMin(Number(e.target.value));
  };

  const handleChangeInputPriceMax = (e: ChangeEvent<HTMLInputElement>) => {
    setMax(Number(e.target.value));
  };

  const handleBlurInputPriceMin = (e: ChangeEvent<HTMLInputElement>) => {
    let price = Number(e.target.value);

    if (price < PRICE_MIN || price > PRICE_MAX) {
      price = PRICE_MIN;
    }

    setMin(price);
    onChange({ minPrice: price, maxPrice: max} );
  };

  const handleBlurInputPriceMax = (e: ChangeEvent<HTMLInputElement>) => {
    let price = Number(e.target.value);

    if (price > PRICE_MAX || !price || price < 0 || price < min) {
      price = PRICE_MAX;
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
            value={min}
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
            value={max}
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
