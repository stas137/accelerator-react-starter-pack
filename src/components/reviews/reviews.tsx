import Review from '../review/review';
import {GuitarType} from '../../types/guitars';
import {getSortedGuitarsComments} from '../../utils/common';
import {useEffect, useState} from 'react';
import {REVIEWS_COUNT} from '../../utils/const';
import ModalReview from '../modal-review/modal-review';
import {ModalThanks} from '../modal-thanks/modal-thanks';

type ReviewsProps = {
  guitar: GuitarType
}

function Reviews({guitar}: ReviewsProps): JSX.Element {

  const [showModalReview, setShowModalReview] = useState<boolean>(false);
  const [showModalThanks, setShowModalThanks] = useState<boolean>(false);
  const [commentsCount, setCommentsCount] = useState<number>(REVIEWS_COUNT);
  const comments = guitar.comments.length ? getSortedGuitarsComments(guitar.comments) : [];
  const commentsForReviewPage = comments.slice(0, commentsCount);

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = showModalReview || showModalThanks ? 'hidden' : 'auto';
    }
  }, [showModalReview, showModalThanks]);

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <span className="button button--red-border button--big reviews__sumbit-button" onClick={() => {setShowModalReview(true);}}>Оставить отзыв</span>

      {
        commentsForReviewPage.length
          ? commentsForReviewPage.map((comment) => (<Review key={comment.id} comment={comment} />))
          : ''
      }

      {
        commentsCount >= comments.length
          ? ''
          : (
            <button className="button button--medium reviews__more-button" onClick={ () => setCommentsCount(commentsCount + REVIEWS_COUNT) }>
              Показать еще отзывы
            </button>)
      }

      <a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>

      {
        showModalReview
          ? (
            <ModalReview
              guitar={guitar}
              setShowModalReview={setShowModalReview}
              setShowModalThanks={setShowModalThanks}
            />)
          : ''
      }

      {
        showModalThanks
          ? (
            <ModalThanks
              setShowModalThanks={setShowModalThanks}
            />)
          : ''
      }
    </section>
  );
}

export {Reviews};
