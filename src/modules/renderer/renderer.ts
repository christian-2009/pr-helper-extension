import {
  COMMENT_DETAILS_CONTAINER_SELECTOR,
  INNER_CONTAINER_CLASS,
  OUTER_CONTAINER_CLASS,
  PR_HEADER_CONTAINER_SELECTOR,
  UNACTIONED_COMMENTS_ELEMENT_SELECTOR,
  UNACTIONED_COMMENTS_HEADER_CLASS
} from '../../constants';
import { CommentData } from '../../CommentData';

export const renderCommentInfo = (
  numberOfUnactionedComments: number,
  totalNumberOfComments: number,
  comments: CommentData[]
) => {
  if (!totalNumberOfComments) {
    removeUnactionedCommentsElementFromScreen();
    return;
  }

  const currentUnactionedCommentsElement = document.querySelector(UNACTIONED_COMMENTS_ELEMENT_SELECTOR) ?? null;
  const unactionedCommentsText = `${numberOfUnactionedComments}/${totalNumberOfComments} comments need actioning`;

  if (!currentUnactionedCommentsElement) {
    renderInitialUnactionedCommentsView(unactionedCommentsText, comments);
  } else {
    currentUnactionedCommentsElement.textContent = unactionedCommentsText;
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

const renderInitialUnactionedCommentsView = (
  unactionedCommentsText: string,
  comments: CommentData[]
) => {
  const headerContainer = document.querySelector(PR_HEADER_CONTAINER_SELECTOR);

  const outerContainer = document.createElement('div');
  //need to add id to use getElementById if removing actioned comments from screen
  outerContainer.id = OUTER_CONTAINER_CLASS;
  outerContainer.classList.add(OUTER_CONTAINER_CLASS);

  const innerContainer = document.createElement('div');
  innerContainer.classList.add(INNER_CONTAINER_CLASS);

  const unactionedCommentsHeader = document.createElement('div');
  unactionedCommentsHeader.classList.add(UNACTIONED_COMMENTS_HEADER_CLASS);
  unactionedCommentsHeader.textContent = unactionedCommentsText;

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

  innerContainer?.appendChild(unactionedCommentsHeader);
  innerContainer.appendChild(commentDetailsContainer);
  outerContainer?.appendChild(innerContainer);
  headerContainer?.appendChild(outerContainer);
};

const removeUnactionedCommentsElementFromScreen = () => {
  document.getElementById(OUTER_CONTAINER_CLASS)?.remove();
};
