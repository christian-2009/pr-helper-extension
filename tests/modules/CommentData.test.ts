import { CommentData } from '../../src/modules/CommentData';
import * as fs from 'node:fs';
import * as path from 'node:path';

const comment_with_reply_mock_html = fs.readFileSync(path.resolve(__dirname, '../tests/__fixtures__/comment_with_reply_mock.html'), 'utf-8');
const pr_with_multiple_files_and_comments = fs.readFileSync(path.resolve(__dirname, '../tests/__fixtures__/pr_with_multiple_files_and_comments.html'), 'utf-8');

describe('CommentData', () => {
  const assignee = 'some-assignee';

  beforeEach(() => {
    document.body.innerHTML = ''; // Reset DOM
  });

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
      const commentElement = document.createElement('div');
      const firstComment = document.createElement('div');
      firstComment.textContent = 'first comment';
      commentElement.appendChild(firstComment);

      const secondComment = document.createElement('div');
      const secondCommentAuthor = document.createElement('div');
      secondComment.appendChild(secondCommentAuthor);
      secondCommentAuthor.classList.add('author');
      secondCommentAuthor.textContent = lastCommentAuthor;
      commentElement.appendChild(secondComment);

      const commentData = new CommentData(commentElement, assignee);

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
      const commentElement = document.createElement('div');
      const comment = document.createElement('div');
      comment.classList.add('social-reaction-summary-item');
      if (hasReactionText) {
        comment.textContent = 'reaction';
      }
      commentElement.appendChild(comment);

      const commentData = new CommentData(commentElement, assignee);

      // When
      const actual = commentData.hasReaction();

      // Then
      expect(actual).toBe(expectedValue);
    });
  });

  describe('getCommentDescription', () => {
    it('should return correct comment description', () => {
      // Given
      const commentElement = document.createElement('div');
      commentElement.innerHTML = comment_with_reply_mock_html;

      document.body.appendChild(commentElement);

      const commentData = new CommentData(commentElement, assignee);

      // When
      const actual = commentData.getCommentDescription();

      // Then
      expect(actual).toEqual('new comment');
    });
  });

  describe('getFileName', () => {
    it.each(
      [
        [1, 'Title 1'],
        [2, 'Title 2'],
        [3, 'Title 3'],
        [4, 'Title 4'],
        [5, '']
      ]
    )('should return correct file name of comment', (
      numberOfFile: number,
      expectedFileName: string
    ) => {
      // Given
      const container = document.createElement('div');
      container.innerHTML = pr_with_multiple_files_and_comments;

      document.body.appendChild(container);

      const fileElement = container.querySelector(`.js-file.js-details-container:nth-child(${numberOfFile})`);

      const commentElement = document.createElement('div');
      fileElement?.appendChild(commentElement);

      const commentData = new CommentData(commentElement, assignee);

      // When
      const actual = commentData.getFileName();

      // Then
      expect(actual).toEqual(expectedFileName);
    });
  });
});
