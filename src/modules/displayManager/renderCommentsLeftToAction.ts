import { CommentData } from '../../CommentData';
import {
  COMMENTS_LEFT_TO_ACTION_HEADER_CLASS,
  INNER_CONTAINER_CLASS,
  OUTER_CONTAINER_CLASS,
  PR_HEADER_CONTAINER_SELECTOR
} from '../../constants';

export const renderCommentsLeftToAction = (
  commentsLeftToActionText: string,
  comments: CommentData[],
  expandCommentDetails: boolean
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
  commentDetailsContainer.style.display = expandCommentDetails ? 'flex' : 'none';
  innerContainer.addEventListener('click', () => {
    commentDetailsContainer.style.display = commentDetailsContainer.style.display === 'none' ? 'flex' : 'none';
  });

  // for (const comment of comments) {
  //   const commentDetail = document.createElement('div');
  //   commentDetail.textContent = comment.commentDescription;
  //   commentDetailsContainer.appendChild(commentDetail);
  // }

  for (const [fileName, fileComments] of Object.entries(getCommentsWithinEachFile(comments))) {
    const commentDetailsFileContainer = document.createElement('div');
    commentDetailsFileContainer.textContent = fileName;

    for (const commentDescription of fileComments) {
      const commentDetail = document.createElement('div');
      commentDetail.textContent = commentDescription;
      commentDetailsFileContainer.appendChild(commentDetail);
    }

    commentDetailsContainer.appendChild(commentDetailsFileContainer);

  }

  innerContainer?.appendChild(commentsLeftToActionElementContainer);
  innerContainer.appendChild(commentDetailsContainer);
  outerContainer?.appendChild(innerContainer);
  headerContainer?.appendChild(outerContainer);
};

type commentsWithinEachFile = {
  [key: string]: string[]
}

const getCommentsWithinEachFile = (comments: CommentData[]) => {
  const commentsWithinEachFile: commentsWithinEachFile = {};
  comments.forEach(comment => {
    if (!commentsWithinEachFile[comment.fileName]) {
      commentsWithinEachFile[comment.fileName] = [comment.commentDescription];
      return;
    }
    commentsWithinEachFile[comment.fileName].push(comment.commentDescription);
  });
  return commentsWithinEachFile;
};

