import { ACTIONED_COMMENTS_CLASS, PR_HEADER_CONTAINER_SELECTOR } from '../constants';

export const renderCommentInfo = (
  numberOfActionedComments: number,
  totalNumberOfComments: number
) => {
  const currentActionedCommentsElement = document.querySelector('.comments-actioned') ?? null;
  const actionedCommentsText = `${numberOfActionedComments}/${totalNumberOfComments} comments have been actioned`;

  if (!currentActionedCommentsElement) {
    renderInitialActionedComments(actionedCommentsText);
  } else {
    currentActionedCommentsElement.textContent = actionedCommentsText;
  }
};

const renderInitialActionedComments = (
  actionedCommentsText: string
) => {
  const headerContainer = document.querySelector(PR_HEADER_CONTAINER_SELECTOR);
  const actionedCommentsElement = document.createElement('div');
  actionedCommentsElement.classList.add(ACTIONED_COMMENTS_CLASS);
  actionedCommentsElement.textContent = actionedCommentsText;
  headerContainer?.appendChild(actionedCommentsElement);
};