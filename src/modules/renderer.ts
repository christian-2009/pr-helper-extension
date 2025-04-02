import { ACTIONED_COMMENTS_CLASS, PR_HEADER_CONTAINER_SELECTOR } from '../constants';

export const renderCommentInfo = (
  numberActionedComments: number,
  totalNumberOfComments: number
) => {
  const currentActionedCommentsElement = document.querySelector('.comments-actioned') ?? null;

  if (!currentActionedCommentsElement) {
    renderInitialActionedComments(numberActionedComments, totalNumberOfComments);
  } else {
    currentActionedCommentsElement.textContent = `${numberActionedComments}/${totalNumberOfComments} have been actioned`;
  }
};

const renderInitialActionedComments = (
  numberActionedComments: number,
  totalNumberOfComments: number
) => {
  const headerContainer = document.querySelector(PR_HEADER_CONTAINER_SELECTOR);
  const actionedCommentsElement = document.createElement('div');
  actionedCommentsElement.classList.add(ACTIONED_COMMENTS_CLASS);
  actionedCommentsElement.textContent = `${numberActionedComments}/${totalNumberOfComments} have been actioned`;
  headerContainer?.appendChild(actionedCommentsElement);
};