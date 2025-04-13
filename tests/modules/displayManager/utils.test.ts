import { COMMENT_DETAILS_CONTAINER_CLASS } from '../../../src/constants';
import { isCommentDetailsExpanded } from '../../../src/modules/displayManager/utils';

describe('utils', () => {
  describe('isCommentDetailsExpanded', () => {
    beforeEach(() => {
      document.body.innerHTML = '';
    });

    it('should return true when comment details expanded', () => {
      // Given
      const commentDetailsMock = document.createElement('div');
      commentDetailsMock.classList.add(COMMENT_DETAILS_CONTAINER_CLASS);
      commentDetailsMock.style.display = 'flex';
      document.body.appendChild(commentDetailsMock);

      // When
      const actual = isCommentDetailsExpanded();

      // Then
      expect(actual).toBe(true);
    });

    it('should return false when comment details expanded', () => {
      // Given
      const commentDetailsMock = document.createElement('div');
      commentDetailsMock.classList.add(COMMENT_DETAILS_CONTAINER_CLASS);
      commentDetailsMock.style.display = 'block';
      document.body.appendChild(commentDetailsMock);

      // When
      const actual = isCommentDetailsExpanded();

      // Then
      expect(actual).toBe(false);
    });

  });
});