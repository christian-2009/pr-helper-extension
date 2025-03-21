import { CommentData } from '../src/CommentData';

describe('CommentData', () => {
  const assignee = 'some-assignee';

  describe('isLastReplyFromAssignee', () => {
    it('should return false if no replies', () => {
      // Given
      const commentElement = document.createElement('div');
      const commentData = new CommentData(commentElement, assignee);

      // When
      const actual = commentData.isLastReplyFromAssignee();

      // Then
      expect(actual).toBe(false);
    });

    it.each(
      [
        ['some-assignee', true],
        ['random-person', false]
      ]
    )('should return correct value if last reply is from assignee', (
      lastCommentAuthor,
      expectedResult
    ) => {
      // Given
      const container = document.createElement('div');
      const firstComment = document.createElement('div');
      firstComment.textContent = 'first comment';
      container.appendChild(firstComment);

      const secondComment = document.createElement('div');
      const secondCommentAuthor = document.createElement('div');
      secondComment.appendChild(secondCommentAuthor);
      secondCommentAuthor.classList.add('author');
      secondCommentAuthor.textContent = lastCommentAuthor;
      container.appendChild(secondComment);

      const commentData = new CommentData(container, assignee);

      // When
      const actual = commentData.isLastReplyFromAssignee();

      // Then
      expect(actual).toBe(expectedResult);
    });
  });

  describe('hasReaction', () => {
    it.each(
      [
        [true, true],
        [false, false]
      ]
    )('should return correct value if there is a reaction', (
      hasReactionText,
      expectedValue
    ) => {
      // Given
      const container = document.createElement('div');
      const comment = document.createElement('div');
      comment.classList.add('social-reaction-summary-item');
      if (hasReactionText) {
        comment.textContent = 'reaction'
      }
      container.appendChild(comment);

      const commentData = new CommentData(container, assignee);

      // When
      const actual = commentData.hasReaction();

      // Then
      expect(actual).toBe(expectedValue);
    });
  });
});
