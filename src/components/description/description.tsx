import {GuitarType} from '../../types/guitars';

type DescriptionProps = {
  guitar: GuitarType,
}

function Description({guitar}: DescriptionProps): JSX.Element {
  return (
    <div className="tabs__content" id="description">
      <p className="tabs__product-description ">
        {guitar.description}
      </p>
    </div>
  );
}

export {Description};
