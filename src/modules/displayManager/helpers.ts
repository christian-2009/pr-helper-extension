import { COMMENT_DETAILS_CONTAINER_SELECTOR } from '../../constants';
import { CommentData } from '../CommentData';

type fileToComments = {
  [key: string]: CommentData[]
}

export const isCommentDetailsExpanded = () => {
  const commentDetailsElement = document.querySelector(COMMENT_DETAILS_CONTAINER_SELECTOR) ?? null;
  const commentDetailsElementStyle = commentDetailsElement && window.getComputedStyle(commentDetailsElement);
  return commentDetailsElementStyle?.display === 'flex';
};

export const createDivElement = (className: string, textContent?: string, id?: string) => {
  const divElement = document.createElement('div');
  divElement.classList.add(className);
  divElement.textContent = textContent ? textContent : '';
  divElement.id = id ? id : '';

  return divElement;
};

export const mapCommentsToFileToComments = (comments: CommentData[]): fileToComments => {
  const commentsWithinEachFile: fileToComments = {};
  comments.forEach(comment => {
    if (!commentsWithinEachFile[comment.fileName]) {
      commentsWithinEachFile[comment.fileName] = [comment];
      return;
    }
    commentsWithinEachFile[comment.fileName].push(comment);
  });
  return commentsWithinEachFile;
};
