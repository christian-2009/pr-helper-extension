import { COMMENT_DETAILS_CONTAINER_CLASS } from '../../../src/constants';
import { createDivElement, isCommentDetailsExpanded } from '../../../src/modules/displayManager/helpers';

describe('helpers', () => {
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

  describe('createDivElement', () => {
    it.each(
      [
        ['mock-class', 'some text', 'id'],
        ['mock-class', 'some text', undefined],
        ['mock-class', undefined, undefined]
      ]
    )('should create a div element with correct properties', (
      className,
      textContent,
      id
    ) => {
      // Given
      // When
      const actual = createDivElement(className, textContent, id);

      // Then
      expect(actual.className).toEqual(className);
      textContent ? expect(actual.textContent).toEqual(textContent) : expect(actual.textContent).toEqual('');
      id ? expect(actual.id).toEqual(id) : expect(actual.id).toEqual('');
    });
  });
});