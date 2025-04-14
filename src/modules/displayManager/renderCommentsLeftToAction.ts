import { CommentData } from '../../CommentData';
import {
  COMMENT_DETAILS_CONTAINER_CLASS,
  COMMENT_DETAILS_FOR_FILE_CLASS,
  COMMENTS_LEFT_TO_ACTION_HEADER_CLASS,
  FILE_NAME_TEXT_CLASS,
  INNER_CONTAINER_CLASS,
  OUTER_CONTAINER_CLASS,
  PR_HEADER_CONTAINER_SELECTOR
} from '../../constants';
import { createDivElement } from './helpers';

type fileToCommentDescriptions = {
  [key: string]: string[]
}

export const renderCommentsLeftToAction = (
  commentsLeftToActionText: string,
  comments: CommentData[],
  expandCommentDetails: boolean
) => {
  const headerContainer = document.querySelector(PR_HEADER_CONTAINER_SELECTOR);

  //need to add id to use getElementById if removing actioned comments from screen
  const outerContainer = createDivElement(OUTER_CONTAINER_CLASS, undefined, OUTER_CONTAINER_CLASS);

  const innerContainer = createDivElement(INNER_CONTAINER_CLASS);

  const commentsLeftToActionElementContainer = createDivElement(COMMENTS_LEFT_TO_ACTION_HEADER_CLASS, commentsLeftToActionText);

  const commentDetailsContainer = createDivElement(COMMENT_DETAILS_CONTAINER_CLASS);
  commentDetailsContainer.style.display = expandCommentDetails ? 'flex' : 'none';
  innerContainer.addEventListener('click', () => {
    commentDetailsContainer.style.display = commentDetailsContainer.style.display === 'none' ? 'flex' : 'none';
  });

  for (const [fileName, fileComments] of Object.entries(mapCommentsToFileToCommentDescriptions(comments))) {
    const individualFileCommentsDetailsContainer = document.createElement('div');
    const fileNameElement = createDivElement(FILE_NAME_TEXT_CLASS, fileName);
    individualFileCommentsDetailsContainer.appendChild(fileNameElement);

    for (const commentDescription of fileComments) {
      const commentDetail = createDivElement(COMMENT_DETAILS_FOR_FILE_CLASS, commentDescription);
      individualFileCommentsDetailsContainer.appendChild(commentDetail);
    }
    commentDetailsContainer.appendChild(individualFileCommentsDetailsContainer);
  }

  innerContainer?.append(commentsLeftToActionElementContainer, commentDetailsContainer);
  outerContainer?.appendChild(innerContainer);
  headerContainer?.appendChild(outerContainer);
};

const mapCommentsToFileToCommentDescriptions = (comments: CommentData[]) => {
  const commentsWithinEachFile: fileToCommentDescriptions = {};
  comments.forEach(comment => {
    if (!commentsWithinEachFile[comment.fileName]) {
      commentsWithinEachFile[comment.fileName] = [comment.commentDescription];
      return;
    }
    commentsWithinEachFile[comment.fileName].push(comment.commentDescription);
  });
  return commentsWithinEachFile;
};

