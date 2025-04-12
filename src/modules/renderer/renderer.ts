import {
  COMMENT_DETAILS_CONTAINER_SELECTOR,
  COMMENTS_LEFT_TO_ACTION_HEADER_CLASS,
  COMMENTS_LEFT_TO_ACTION_HEADER_SELECTOR,
  INNER_CONTAINER_CLASS,
  OUTER_CONTAINER_CLASS,
  PR_HEADER_CONTAINER_SELECTOR
} from '../../constants';
import { CommentData } from '../../CommentData';

export const renderCommentInfo = (
  numberOfCommentsLeftToAction: number,
  totalNumberOfComments: number,
  comments: CommentData[]
) => {
  if (!totalNumberOfComments) {
    removeCommentsLeftToActionElementFromScreen();
    return;
  }

  const currentCommentsLeftToActionElement = document.querySelector(COMMENTS_LEFT_TO_ACTION_HEADER_SELECTOR) ?? null;
  const commentsLeftToActionText = `${numberOfCommentsLeftToAction} ${numberOfCommentsLeftToAction === 1 ? 'comment' : 'comments'} left to action (${totalNumberOfComments} total)`;

  if (!currentCommentsLeftToActionElement) {
    renderInitialCommentsLeftToActionView(commentsLeftToActionText, comments);
  } else {
    currentCommentsLeftToActionElement.textContent = commentsLeftToActionText;
    const commentDetailsContainer = document.querySelector(COMMENT_DETAILS_CONTAINER_SELECTOR);
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

const renderInitialCommentsLeftToActionView = (
  commentsLeftToActionText: string,
  comments: CommentData[]
) => {
  const headerContainer = document.querySelector(PR_HEADER_CONTAINER_SELECTOR);

  const outerContainer = document.createElement('div');
  //need to add id to use getElementById if removing actioned comments from screen
  outerContainer.id = OUTER_CONTAINER_CLASS;
  outerContainer.classList.add(OUTER_CONTAINER_CLASS);

  const innerContainer = document.createElement('div');
  innerContainer.classList.add(INNER_CONTAINER_CLASS);

  const commentsLeftToActionElementContainer = document.createElement('div');
  commentsLeftToActionElementContainer.classList.add(COMMENTS_LEFT_TO_ACTION_HEADER_CLASS);
  commentsLeftToActionElementContainer.textContent = commentsLeftToActionText;

  const commentDetailsContainer = document.createElement('div');
  commentDetailsContainer.classList.add('comment-details');
  innerContainer.addEventListener('click', () => {
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

  innerContainer?.appendChild(commentsLeftToActionElementContainer);
  innerContainer.appendChild(commentDetailsContainer);
  outerContainer?.appendChild(innerContainer);
  headerContainer?.appendChild(outerContainer);
};

const removeCommentsLeftToActionElementFromScreen = () => {
  document.getElementById(OUTER_CONTAINER_CLASS)?.remove();
};
