import { renderCommentInfo } from '../../src/modules/renderer/renderer';
import { screen } from '@testing-library/dom';
import { OUTER_CONTAINER_CLASS, UNACTIONED_COMMENTS_HEADER_CLASS } from '../../src/constants';
import { CommentData } from '../../src/CommentData';

describe('renderer', () => {
  beforeEach(() => {
    document.body.innerHTML = '';

    //Add header element
    const headerElementMock = document.createElement('div');
    headerElementMock.classList.add('gh-header-show');
    document.body.appendChild(headerElementMock);
  });

  it('renders comments that need actioning correctly initially', () => {
    // Given
    const mockComments = Array.of<CommentData>();

    // When
    renderCommentInfo(8, 20, mockComments);

    // Then
    expect(screen.getByText('8/20 comments need actioning')).toBeInTheDocument();
  });

  it.each([
    [9, 20],
    [8, 21],
    [8, 19],
    [9, 19]
  ])('renders updated unactioned comments correctly if there is one already in the DOM', (
    newActionedComments,
    newTotalComments
  ) => {
    // Given
    const mockComments = Array.of<CommentData>();
    renderInitialComment('8/20 comments need actioning');

    // When
    renderCommentInfo(newActionedComments, newTotalComments, mockComments);

    // Then
    expect(screen.getByText(`${newActionedComments}/${newTotalComments} comments need actioning`)).toBeInTheDocument();
    expect(screen.queryByText('8/20 comments need actioning')).not.toBeInTheDocument();
  });

  it('should remove unactioned comments section if there are no comments on pr currently', () => {
    // Given
    const mockComments = Array.of<CommentData>();
    renderInitialComment('1/20 comments need actioning');

    // When
    renderCommentInfo(0, 0, mockComments);

    // Then
    expect(screen.queryByText(/comments need actioning/i)).not.toBeInTheDocument();
  });

  it('should render comment details correctly', () => {
    // Given
    const mockCommentData = Array.of(buildCommentData());

    // When
    renderCommentInfo(1, 5, mockCommentData);

    // Then
    expect(screen.getByText('first comment that should show')).toBeInTheDocument();
    expect(screen.queryByText('reply comment we don\'t care about')).not.toBeInTheDocument();
  });

  //Write test to check that new comment details are added too
});

const renderInitialComment = (text: string) => {
  const actionedCommentElement = document.createElement('div');
  actionedCommentElement.classList.add(UNACTIONED_COMMENTS_HEADER_CLASS);
  actionedCommentElement.textContent = text;

  const actionedCommentsContainer = document.createElement('div');
  actionedCommentsContainer.id = OUTER_CONTAINER_CLASS;
  actionedCommentsContainer.classList.add(OUTER_CONTAINER_CLASS);
  actionedCommentsContainer.appendChild(actionedCommentElement);

  document.body.appendChild(actionedCommentsContainer);
};

const buildCommentData = () => {
  const mockHtml =
    `
    <div>
      <div class="js-file js-details-container">
        <div class="Link--primary Truncate-text">Title 1</div>
        <div>
          <div class="js-comment-body">first comment that should show</div>
          <div class="js-comment-body">reply comment we don't care about</div>
        </div>
      </div>
      <div class="js-file js-details-container">
        <div class="Link--primary Truncate-text">Title 2</div>
      </div>
    </div>
    `;
  const mockCommentElement = document.createElement('div');
  mockCommentElement.innerHTML = mockHtml;
  return new CommentData(mockCommentElement, 'actual assignee');
};