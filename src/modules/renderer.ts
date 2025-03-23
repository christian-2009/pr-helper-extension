import { PR_HEADER_CONTAINER_SELECTOR } from '../constants';

export const renderCommentInfo = (
  numberActionedComments: number,
  totalNumberOfComments: number
) => {
  const container = document.querySelector(PR_HEADER_CONTAINER_SELECTOR);

  const commentsActionedItem = document.createElement('div');
  commentsActionedItem.classList.add('comments-actioned');
  commentsActionedItem.textContent = `${numberActionedComments}/${totalNumberOfComments} have been actioned`;
  container?.appendChild(commentsActionedItem);

};