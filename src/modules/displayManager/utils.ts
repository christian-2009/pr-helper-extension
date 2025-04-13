import { COMMENT_DETAILS_CONTAINER_SELECTOR } from '../../constants';

export const isCommentDetailsExpanded = () => {
  const commentDetailsElement = document.querySelector(COMMENT_DETAILS_CONTAINER_SELECTOR) ?? null;
  const commentDetailsElementStyle = commentDetailsElement && window.getComputedStyle(commentDetailsElement);
  return commentDetailsElementStyle?.display === 'flex';
};