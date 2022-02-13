import Card from '../card/card';
import { GuitarsType, GuitarType } from '../../types/guitars';
import Loading from '../loading/loading';
import { useEffect, useState } from 'react';
import ModalCardAdd from '../modal-card-add/modal-card-add';
import ModalSuccess from '../modal-success/modal-success';

type CatalogCardsPropsType = {
  guitars: GuitarsType,
  loading: boolean,
  error: boolean,
}

function CatalogCards({guitars, loading, error}: CatalogCardsPropsType):JSX.Element {

  const [showModalCardAdd, setShowModalCardAdd] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);

  const [guitarModal, setGuitarModal] = useState<GuitarType>({
    id: 0,
    name: '',
    vendorCode: '',
    type: '',
    description: '',
    previewImg: '',
    stringCount: 0,
    rating: 0,
    price: 0,
    comments: [],
  });

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = showModalCardAdd || showModalSuccess ? 'hidden' : 'auto';
    }
  }, [showModalCardAdd, showModalSuccess]);

  const handleClickAddCard = (guitarModalData: GuitarType, showModalCardAddData: boolean) => {
    setGuitarModal(guitarModalData);
    setShowModalCardAdd(showModalCardAddData);
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
    <>
      <div className="cards catalog__cards">
        {
          guitars.map((guitar) => <Card key={guitar.id} guitar={guitar} handleClickAddCard={handleClickAddCard} />)
        }
      </div>
      {
        showModalCardAdd
          ? (
            <ModalCardAdd
              guitar={guitarModal}
              setShowModalCardAdd={setShowModalCardAdd}
              setShowModalSuccess={setShowModalSuccess}
            />
          )
          : null
      }
      {
        showModalSuccess
          ? (
            <ModalSuccess
              setShowModalSuccess={setShowModalSuccess}
            />
          )
          : null
      }
    </>
  );
}

export default CatalogCards;
