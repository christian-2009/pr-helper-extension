import { renderCommentInfo } from '../../src/modules/renderer/renderer';
import { screen } from '@testing-library/dom';
import { ACTIONED_COMMENTS_CLASS, ACTIONED_COMMENTS_OUTER_CONTAINER_CLASS } from '../../src/constants';
import { CommentData } from '../../src/CommentData';

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
    const mockComments = Array.of<CommentData>();

    // When
    renderCommentInfo(8, 20, mockComments);

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
    const mockComments = Array.of<CommentData>();
    renderInitialComment('8/20 comments have been actioned');

    // When
    renderCommentInfo(newActionedComments, newTotalComments, mockComments);

    // Then
    expect(screen.getByText(`${newActionedComments}/${newTotalComments} comments have been actioned`)).toBeInTheDocument();
    expect(screen.queryByText('8/20 comments have been actioned')).not.toBeInTheDocument();
  });

  it('should remove actioned comments if there are no comments on pr currently', () => {
    // Given
    const mockComments = Array.of<CommentData>();
    renderInitialComment('1/20 comments have been actioned');

    // When
    renderCommentInfo(0, 0, mockComments);

    // Then
    expect(screen.queryByText(/comments have been actioned/i)).not.toBeInTheDocument();
  });
});

const renderInitialComment = (text: string) => {
  const actionedCommentElement = document.createElement('div');
  actionedCommentElement.classList.add(ACTIONED_COMMENTS_CLASS);
  actionedCommentElement.textContent = text;

  const actionedCommentsContainer = document.createElement('div');
  actionedCommentsContainer.id = ACTIONED_COMMENTS_OUTER_CONTAINER_CLASS;
  actionedCommentsContainer.classList.add(ACTIONED_COMMENTS_OUTER_CONTAINER_CLASS);
  actionedCommentsContainer.appendChild(actionedCommentElement);

  document.body.appendChild(actionedCommentsContainer);
};