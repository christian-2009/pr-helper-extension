import { dataExtractor } from '../../../src/modules/dataExtractor/dataExtractor';

describe('dataExtractor', () => {
  beforeEach(() => {
    document.body.innerHTML = ''; // Reset DOM
  });

  describe('unresolvedComments', () => {
    it.each([
      [1, 0],
      [0, 1],
      [1, 1],
      [1, 2],
      [2, 1],
    ])(
      'returns unresolved comments correctly',
      (
        numberOfUnresolvedComments: number,
        numberOfResolvedComments: number,
      ) => {
        // Given
        setupDomWithResolvedAndUnresolvedComments(
          numberOfUnresolvedComments,
          numberOfResolvedComments,
        );

        // When
        const actual = dataExtractor().unresolvedComments;

        // Then
        expect(actual.length).toBe(numberOfUnresolvedComments);
      },
    );
  });

  describe('resolvedComments', () => {
    it.each([
      [1, 0],
      [0, 1],
      [1, 1],
      [1, 2],
      [2, 1],
    ])(
      'returns resolved comments correctly',
      (
        numberOfUnresolvedComments: number,
        numberOfResolvedComments: number,
      ) => {
        // Given
        setupDomWithResolvedAndUnresolvedComments(
          numberOfUnresolvedComments,
          numberOfResolvedComments,
        );

        // When
        const actual = dataExtractor().resolvedComments;

        // Then
        expect(actual.length).toBe(numberOfResolvedComments);
      },
    );
  });
});

const setupDomWithResolvedAndUnresolvedComments = (
  numberOfUnresolvedComments: number,
  numberOfResolvedComments: number,
) => {
  for (let i = 0; i < numberOfUnresolvedComments; i++) {
    const unresolvedComment = document.createElement('div');
    unresolvedComment.setAttribute('data-resolved', 'false');
    document.body.appendChild(unresolvedComment);
  }

  for (let i = 0; i < numberOfResolvedComments; i++) {
    const resolvedComment = document.createElement('div');
    resolvedComment.setAttribute('data-resolved', 'true');
    document.body.appendChild(resolvedComment);
  }
};
