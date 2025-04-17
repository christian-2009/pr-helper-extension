import { displayManager } from '../../../src/modules/displayManager/displayManager';
import { screen } from '@testing-library/dom';
import { COMMENTS_LEFT_TO_ACTION_HEADER_CLASS, OUTER_CONTAINER_CLASS } from '../../../src/constants';
import { CommentData } from '../../../src/modules/CommentData';
import { buildCommentData } from '../../testdata/commentDataBuilder';
import { buildCommentDetails } from '../../testdata/commentDetailsBuilder';

describe('display manager', () => {
  beforeEach(() => {
    document.body.innerHTML = '';

    //Add header element
    const headerElementMock = document.createElement('div');
    headerElementMock.classList.add('gh-header-show');
    document.body.appendChild(headerElementMock);
  });

  describe('comments left to action', () => {
    it('renders comments that need actioning correctly initially', () => {
      // Given
      const mockComments = Array.of<CommentData>();

      // When
      displayManager(8, 20, mockComments);

      // Then
      expect(screen.getByText('8 comments left to action (20 total)')).toBeInTheDocument();
    });

    it.each([
      [9, 20],
      [8, 21],
      [8, 19],
      [9, 19]
    ])('renders updated comments left to action comments correctly if there is one already in the DOM', (
      newActionedComments,
      newTotalComments
    ) => {
      // Given
      const mockComments = Array.of<CommentData>();
      renderInitialCommentLeftToActionElement('8 comments left to action (20 total)');

      // When
      displayManager(newActionedComments, newTotalComments, mockComments);

      // Then
      expect(screen.getByText(`${newActionedComments} comments left to action (${newTotalComments} total)`)).toBeInTheDocument();
      expect(screen.queryByText('8 comments left to action (20 total)')).not.toBeInTheDocument();
    });

    it('should remove comments left to actions comments section if there are no comments on pr currently', () => {
      // Given
      const mockComments = Array.of<CommentData>();
      renderInitialCommentLeftToActionElement('2 comments left to action (20 total)');

      // When
      displayManager(0, 0, mockComments);

      // Then
      expect(screen.queryByText(/comments left to action/i)).not.toBeInTheDocument();
    });

    it('should use comment in header if there is only 1 comment', () => {
      const mockComments = Array.of<CommentData>();

      displayManager(1, 20, mockComments);

      expect(screen.getByText('1 comment left to action (20 total)')).toBeInTheDocument();
    });
  });

  describe('comment details', () => {
    // for these tests we don't care about the numberOfCommentsLeftToAction and totalNumberOfComments passed to renderCommentInfo
    it('should render comment details correctly, and attach scrollIntoView on click', () => {
      // Given
      const mockComment = 'first comment that should show';
      const mockCommentData = Array.of(buildCommentData(mockComment, 'file'));
      const scrollMock = jest.fn();
      mockCommentData[0].commentElement.scrollIntoView = scrollMock;

      // When
      displayManager(1, 5, mockCommentData);

      // Then
      const mockCommentElement = screen.getByText(mockComment);
      expect(mockCommentElement).toBeInTheDocument();
      mockCommentElement.click();
      expect(scrollMock).toHaveBeenCalled();
      
      expect(screen.queryByText('reply comment we don\'t care about')).not.toBeInTheDocument();
      expect(screen.getByText('file')).toBeInTheDocument();
    });

    it('should render multiple comment details when new one added', () => {
      // Given
      renderInitialCommentLeftToActionElement();
      const firstCommentDetail = 'first comment';
      const firstCommentData = buildCommentData(firstCommentDetail, 'file');
      document.querySelector(OUTER_CONTAINER_CLASS)?.appendChild(buildCommentDetails(firstCommentDetail));

      const nextCommentData = buildCommentData('next comment', 'file2');

      // When
      displayManager(1, 5, [firstCommentData, nextCommentData]);

      // Then
      expect(screen.getByText(firstCommentDetail)).toBeInTheDocument();
      expect(screen.getByText('next comment')).toBeInTheDocument();
      expect(screen.getByText('file')).toBeInTheDocument();
      expect(screen.getByText('file2')).toBeInTheDocument();
    });
  });

});

const renderInitialCommentLeftToActionElement = (text: string = '8 comments left to action (20 total)') => {
  const commentsLeftToActionElement = document.createElement('div');
  commentsLeftToActionElement.classList.add(COMMENTS_LEFT_TO_ACTION_HEADER_CLASS);
  commentsLeftToActionElement.textContent = text;

  const commentsLeftToActionElementContainer = document.createElement('div');
  commentsLeftToActionElementContainer.id = OUTER_CONTAINER_CLASS;
  commentsLeftToActionElementContainer.classList.add(OUTER_CONTAINER_CLASS);
  commentsLeftToActionElementContainer.appendChild(commentsLeftToActionElement);

  document.body.appendChild(commentsLeftToActionElementContainer);
};



