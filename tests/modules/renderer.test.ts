import { renderCommentInfo } from '../../src/modules/renderer';
import { screen } from '@testing-library/dom';
import { ACTIONED_COMMENTS_CLASS, ACTIONED_COMMENTS_PARENT_CLASS } from '../../src/constants';

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
    renderInitialComment('8/20 comments have been actioned');

    // When
    renderCommentInfo(newActionedComments, newTotalComments);

    // Then
    expect(screen.getByText(`${newActionedComments}/${newTotalComments} comments have been actioned`)).toBeInTheDocument();
    expect(screen.queryByText('8/20 comments have been actioned')).not.toBeInTheDocument();
  });

  it('should remove actioned comments if there are no comments on pr currently', () => {
    // Given
    renderInitialComment('1/20 comments have been actioned');

    // When
    renderCommentInfo(0, 0);

    // Then
    expect(screen.queryByText(/comments have been actioned/i)).not.toBeInTheDocument();
  });
});

const renderInitialComment = (text: string) => {
  const actionedCommentElement = document.createElement('div');
  actionedCommentElement.classList.add(ACTIONED_COMMENTS_CLASS);
  actionedCommentElement.textContent = text;

  const actionedCommentsContainer = document.createElement('div');
  actionedCommentsContainer.id = ACTIONED_COMMENTS_PARENT_CLASS;
  actionedCommentsContainer.classList.add(ACTIONED_COMMENTS_PARENT_CLASS);
  actionedCommentsContainer.appendChild(actionedCommentElement);

  document.body.appendChild(actionedCommentsContainer);
};