type FilterElementStringProps = {
  item: number,
  checked: boolean,
  disabled: boolean,
  handleInputStringsChange: (item: number) => void,
};

function FilterElementString({item, checked, disabled, handleInputStringsChange}: FilterElementStringProps): JSX.Element {
  return (
    <div className="form-checkbox catalog-filter__block-item" key={item}>
      <input className="visually-hidden" type="checkbox" id={`${item}-strings`} name={`${item}-strings`} checked={checked} disabled={disabled} onChange={() => handleInputStringsChange(item)} />
      <label htmlFor={`${item}-strings`}>{item}</label>
    </div>
  );
}

export default FilterElementString;
