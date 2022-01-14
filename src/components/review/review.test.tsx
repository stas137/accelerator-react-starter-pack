import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import Review from './review';
import {makeFakeComment} from '../../utils/mock';

const history = createMemoryHistory();

const mockComment = makeFakeComment();

describe('Component: Review', () => {

  it('should render correctly', () => {

    render(
      <Router history={history}>
        <Review
          comment={mockComment}
        />
      </Router>,
    );

    expect(screen.getByText(mockComment.userName)).toBeInTheDocument();
    expect(screen.getByText(mockComment.comment)).toBeInTheDocument();
  });

});
