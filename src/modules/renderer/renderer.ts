import {
  ACTIONED_COMMENTS_CLASS,
  ACTIONED_COMMENTS_INNER_CONTAINER_CLASS,
  ACTIONED_COMMENTS_OUTER_CONTAINER_CLASS,
  PR_HEADER_CONTAINER_SELECTOR
} from '../../constants';
import { CommentData } from '../../CommentData';

export const renderCommentInfo = (
  numberOfUnactionedComments: number,
  totalNumberOfComments: number,
  comments: CommentData[]
) => {
  if (!totalNumberOfComments) {
    removeActionedCommentsFromScreen();
    return;
  }

  const currentActionedCommentsElement = document.querySelector('.comments-actioned') ?? null;
  const unactionedCommentsText = `${numberOfUnactionedComments}/${totalNumberOfComments} comments need actioning`;

  if (!currentActionedCommentsElement) {
    renderInitialActionedComments(unactionedCommentsText, comments);
  } else {
    currentActionedCommentsElement.textContent = unactionedCommentsText;
    const commentDetailsContainer = document.querySelector('.comment-details');
    if (commentDetailsContainer) {
      commentDetailsContainer.innerHTML = '';
    }
    for (const comment of comments) {
      const commentDetail = document.createElement('div');
      commentDetail.textContent = comment.commentDescription;
      commentDetailsContainer?.appendChild(commentDetail);
    }

  }
};

const renderInitialActionedComments = (
  actionedCommentsText: string,
  comments: CommentData[]
) => {
  const headerContainer = document.querySelector(PR_HEADER_CONTAINER_SELECTOR);

  const actionedCommentsOuterContainer = document.createElement('div');
  //need to add id to use getElementById if removing actioned comments from screen
  actionedCommentsOuterContainer.id = ACTIONED_COMMENTS_OUTER_CONTAINER_CLASS;
  actionedCommentsOuterContainer.classList.add(ACTIONED_COMMENTS_OUTER_CONTAINER_CLASS);

  const actionedCommentsInnerContainer = document.createElement('div');
  actionedCommentsInnerContainer.classList.add(ACTIONED_COMMENTS_INNER_CONTAINER_CLASS);

  const actionedCommentsTextElement = document.createElement('div');
  actionedCommentsTextElement.classList.add(ACTIONED_COMMENTS_CLASS);
  actionedCommentsTextElement.textContent = actionedCommentsText;

  const commentDetailsContainer = document.createElement('div');
  commentDetailsContainer.classList.add('comment-details');
  commentDetailsContainer.textContent = 'Comments that need actioning';
  actionedCommentsInnerContainer.addEventListener('click', () => {
    if (commentDetailsContainer.style.display === 'none') {
      commentDetailsContainer.style.display = 'flex';
    } else {
      commentDetailsContainer.style.display = 'none';
    }
  });

  for (const comment of comments) {
    const commentDetail = document.createElement('div');
    commentDetail.textContent = comment.commentDescription;
    commentDetailsContainer.appendChild(commentDetail);
  }

  actionedCommentsInnerContainer?.appendChild(actionedCommentsTextElement);
  actionedCommentsInnerContainer.appendChild(commentDetailsContainer);
  actionedCommentsOuterContainer?.appendChild(actionedCommentsInnerContainer);
  headerContainer?.appendChild(actionedCommentsOuterContainer);
};

const removeActionedCommentsFromScreen = () => {
  document.getElementById(ACTIONED_COMMENTS_OUTER_CONTAINER_CLASS)?.remove();
};
