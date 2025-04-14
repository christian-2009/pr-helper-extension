import { COMMENT_DETAILS_CONTAINER_CLASS } from '../../src/constants';

export const buildCommentDetails = (commentDetailText: string) => {
  const mockHtml =
    `
    <div>${commentDetailText}</div>
    `;
  const mockHtmlElement = document.createElement('div');
  mockHtmlElement.classList.add(COMMENT_DETAILS_CONTAINER_CLASS);
  mockHtmlElement.innerHTML = mockHtml;
  return mockHtmlElement;
};
