import { renderCommentInfo } from '../../src/modules/renderer';
import { screen } from '@testing-library/dom';

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
});