import Card from '../card/card';
import { GuitarsType, GuitarType } from '../../types/guitars';
import Loading from '../loading/loading';
import { ThunkAppDispatch } from '../../types/action';
import { connect, ConnectedProps } from 'react-redux';
import { setGuitarModal, setShowModalCardAdd } from '../../store/action';

type CatalogCardsPropsType = {
  guitars: GuitarsType,
  loading: boolean,
  error: boolean,
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSetGuitarModal(guitar: GuitarType) {
    dispatch(setGuitarModal(guitar));
  },
  onSetShowModalCardAdd(flag: boolean) {
    dispatch(setShowModalCardAdd(flag));
  },
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function CatalogCards({guitars, loading, error, onSetGuitarModal, onSetShowModalCardAdd}: CatalogCardsPropsType & PropsFromRedux):JSX.Element {

  const handleClickAddCard = (guitarModalData: GuitarType) => {
    onSetGuitarModal(guitarModalData);
    onSetShowModalCardAdd(true);
  };

  if (loading) {
    return (
      <div className="cards catalog__cards">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="cards catalog__cards">
        Error loading. Try later
      </div>
    );
  }

  return (
    <div className="cards catalog__cards">
      {
        guitars.map((guitar) => <Card key={guitar.id} guitar={guitar} handleClickAddCard={handleClickAddCard} />)
      }
    </div>
  );
}

export default connector(CatalogCards);
