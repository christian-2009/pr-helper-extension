import { renderCommentInfo } from '../../src/modules/renderer';
import { screen } from '@testing-library/dom';
import { ACTIONED_COMMENTS_CLASS } from '../../src/constants';

describe('renderer', () => {
  beforeEach(() => {
    document.body.innerHTML = '';

    //Add header element
    const headerElementMock = document.createElement('div');
    headerElementMock.classList.add('gh-header-show');
    document.body.appendChild(headerElementMock);
  });

  it('renders actioned comments correctly initially', () => {
    // Given
    // When
    renderCommentInfo(8, 20);

    // Then
    expect(screen.getByText('8/20 comments have been actioned')).toBeInTheDocument();
  });

  it.each([
    [9, 20],
    [8, 21],
    [8, 19],
    [9, 19]
  ])('renders updated actioned comments correctly if there is one already in the DOM', (
    newActionedComments,
    newTotalComments
  ) => {
    // Given
    const actionedCommentElement = document.createElement('div');
    actionedCommentElement.classList.add(ACTIONED_COMMENTS_CLASS);
    actionedCommentElement.textContent = '8/20 comments have been actioned';

    // When
    renderCommentInfo(newActionedComments, newTotalComments);

    // Then
    expect(screen.getByText(`${newActionedComments}/${newTotalComments} comments have been actioned`)).toBeInTheDocument();
    expect(screen.queryByText('8/20 comments have been actioned')).not.toBeInTheDocument();
  });
});