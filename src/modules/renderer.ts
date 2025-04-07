import { ACTIONED_COMMENTS_CLASS, ACTIONED_COMMENTS_PARENT_CLASS, PR_HEADER_CONTAINER_SELECTOR } from '../constants';

export const renderCommentInfo = (
  numberOfActionedComments: number,
  totalNumberOfComments: number
) => {
  if (!totalNumberOfComments) {
    removeActionedCommentsFromScreen();
    return;
  }

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

  const actionedCommentsContainer = document.createElement('div');
  //need to add id to use getElementById if removing actioned comments from screen
  actionedCommentsContainer.id = ACTIONED_COMMENTS_PARENT_CLASS;
  actionedCommentsContainer.classList.add(ACTIONED_COMMENTS_PARENT_CLASS);

  const actionedCommentsTextElement = document.createElement('div');
  actionedCommentsTextElement.classList.add(ACTIONED_COMMENTS_CLASS);
  actionedCommentsTextElement.textContent = actionedCommentsText;

  actionedCommentsContainer?.appendChild(actionedCommentsTextElement);
  headerContainer?.appendChild(actionedCommentsContainer);
};

const removeActionedCommentsFromScreen = () => {
  document.getElementById(ACTIONED_COMMENTS_PARENT_CLASS)?.remove();
};