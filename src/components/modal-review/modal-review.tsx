import React from 'react';
import {GuitarType} from '../../types/guitars';
import {FormEvent, MouseEvent, KeyboardEvent, useState} from 'react';
import {getRange, getNameRating} from '../../utils/common';
import {MODAL_REVIEW_HEIGHT, MODAL_REVIEW_MARGIN_BOTTOM, MODAL_REVIEW_WIDTH, RATING_MAX} from '../../utils/const';
import {ThunkAppDispatch} from '../../types/action';
import {fetchGuitarCommentAction} from '../../store/api-actions';
import {connect, ConnectedProps} from 'react-redux';

type ModalReviewProps = {
  guitar: GuitarType,
  setShowModalReview: (flag: boolean) => void,
  setShowModalThanks: (flag: boolean) => void,
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSendGuitarComment(userName: string, advantage: string, disadvantage: string, comment: string, rating: number, guitarId: number) {
    dispatch(fetchGuitarCommentAction(userName, advantage, disadvantage, comment, rating, guitarId));
  },
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function ModalReview({guitar, setShowModalReview, setShowModalThanks, onSendGuitarComment}: ModalReviewProps & PropsFromRedux): JSX.Element {

  const [userName, setUserName] = useState<string>('');
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [advantage, setAdvantage] = useState<string>('');
  const [disadvantage, setDisadvantage] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const arrayForRating = getRange(RATING_MAX).reverse();

  const handlerSubmitButton = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (userName.trim().length && reviewRating) {
      onSendGuitarComment(userName, advantage, disadvantage, comment, reviewRating, guitar.id);
      setShowModalReview(false);
      setShowModalThanks(true);
    }
  };

  const handlerKeyDownModalContent = (evt: KeyboardEvent<HTMLFormElement>) => {
    if (evt.key === 'Escape') {
      setShowModalReview(false);
    }
  };

  const handlerClickModalOverlay = (evt: MouseEvent<HTMLElement>) => {
    setShowModalReview(false);
  };

  const handlerBlurButton = () => {
    const personNameInput = document.getElementById('user-name');
    if (personNameInput) {
      personNameInput.focus();
    }
  };

  return (
    <div style={{position: 'relative', width: MODAL_REVIEW_WIDTH, height: MODAL_REVIEW_HEIGHT, marginBottom: MODAL_REVIEW_MARGIN_BOTTOM}}>
      <div className="modal is-active modal--review modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={handlerClickModalOverlay}></div>
          <div className="modal__content">
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitar.name}</h3>
            <form
              className="form-review"
              onSubmit={(evt) => handlerSubmitButton(evt)}
              onKeyDown={handlerKeyDownModalContent}
            >
              <div className="form-review__wrapper">
                <div className="form-review__name-wrapper">
                  <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                  <input className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off"
                    value={userName}
                    onChange={(evt) => setUserName(evt.target.value)}
                    autoFocus
                    tabIndex={0}
                  />
                  {
                    userName.trim().length
                      ? <span className="form-review__warning">&nbsp;</span>
                      : <span className="form-review__warning">Заполните поле</span>
                  }

                </div>
                <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                  <div className="rate rate--reverse">

                    {
                      arrayForRating.map((item) => (
                        <React.Fragment key={item}>
                          <input className="visually-hidden" type="radio" id={`star-${item.toString()}`} name="rate"
                            value={item.toString()}
                            onClick={() => setReviewRating(item)}
                          />
                          <label className="rate__label" htmlFor={`star-${item.toString()}`} title={getNameRating(item)} tabIndex={0}></label>
                        </React.Fragment>
                      ))
                    }

                    <span className="rate__count"></span>

                    {
                      reviewRating
                        ? <span className="rate__message">&nbsp;</span>
                        : <span className="rate__message">Поставьте оценку</span>
                    }

                  </div>
                </div>
              </div>
              <label className="form-review__label" htmlFor="user-name">Достоинства</label>
              <input className="form-review__input" id="pros" type="text" autoComplete="off"
                value={advantage}
                onChange={(evt) => setAdvantage(evt.target.value)}
              />
              <label className="form-review__label" htmlFor="user-name">Недостатки</label>
              <input className="form-review__input" id="user-name" type="text" autoComplete="off"
                value={disadvantage}
                onChange={(evt) => setDisadvantage(evt.target.value)}
              />
              <label className="form-review__label" htmlFor="user-name">Комментарий</label>
              <textarea className="form-review__input form-review__input--textarea" id="user-name" rows={10} autoComplete="off"
                value={comment}
                onChange={(evt) => setComment(evt.target.value)}
              >
              </textarea>
              <button className="button button--medium-20 form-review__button" type="submit" onBlur={handlerBlurButton}>Отправить отзыв</button>
            </form>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area" onClick={() => {setShowModalReview(false);}}></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connector(ModalReview);
