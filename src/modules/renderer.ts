import { ACTIONED_COMMENTS_CLASS, PR_HEADER_CONTAINER_SELECTOR } from '../constants';

export const renderCommentInfo = (
  numberOfActionedComments: number,
  totalNumberOfComments: number
) => {
  const currentActionedCommentsElement = document.querySelector('.comments-actioned') ?? null;

  if (!currentActionedCommentsElement) {
    renderInitialActionedComments(numberOfActionedComments, totalNumberOfComments);
  } else {
    currentActionedCommentsElement.textContent = `${numberOfActionedComments}/${totalNumberOfComments} comments have been actioned`;
  }
};

const renderInitialActionedComments = (
  numberOfActionedComments: number,
  totalNumberOfComments: number
) => {
  const headerContainer = document.querySelector(PR_HEADER_CONTAINER_SELECTOR);
  const actionedCommentsElement = document.createElement('div');
  actionedCommentsElement.classList.add(ACTIONED_COMMENTS_CLASS);
  actionedCommentsElement.textContent = `${numberOfActionedComments}/${totalNumberOfComments} comments have been actioned`;
  headerContainer?.appendChild(actionedCommentsElement);
};