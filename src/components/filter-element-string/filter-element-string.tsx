type FilterElementStringProps = {
  item: string,
  checked: boolean,
  handleInputStringsChange: () => void,
};

function FilterElementString({item, checked, handleInputStringsChange}: FilterElementStringProps): JSX.Element {
  return (
    <div className="form-checkbox catalog-filter__block-item" key={item}>
      <input className="visually-hidden"
        type="checkbox"
        id={`${item}-strings`}
        name={`${item}-strings`} checked={checked} onChange={() => handleInputStringsChange()}
      />
      <label htmlFor={`${item}-strings`}>{item}</label>
    </div>
  );
}

export default FilterElementString;
