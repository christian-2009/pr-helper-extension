import { PR_HEADER_CONTAINER_SELECTOR } from '../constants';

export const renderCommentInfo = (
  numberActionedComments: number,
  totalNumberOfComments: number
) => {
  const commentsActionedItem = document.querySelector('.comments-actioned');

  if (commentsActionedItem) {
    commentsActionedItem.textContent = `${numberActionedComments}/${totalNumberOfComments} have been actioned`;
    return;
  }

  const container = document.querySelector(PR_HEADER_CONTAINER_SELECTOR);
  const firstRenderCommentsActionedItem = document.createElement('div');
  firstRenderCommentsActionedItem.classList.add('comments-actioned');
  firstRenderCommentsActionedItem.textContent = `${numberActionedComments}/${totalNumberOfComments} have been actioned`;
  container?.appendChild(firstRenderCommentsActionedItem);

};