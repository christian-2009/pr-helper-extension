import { dataExtractor } from './dataExtractor';
import { CommentData } from '../CommentData';
import { displayManager } from './displayManager/displayManager';

export function prHelperExtension() {
  const {
    unresolvedComments,
    numberOfComments,
    assignee
  } = dataExtractor();

  const unresolvedCommentData = [...unresolvedComments].map((commentElement) => {
    return new CommentData(commentElement, assignee);
  });
  const commentsLeftToAction = unresolvedCommentData.filter((comment) => !comment.hasBeenActioned);

  displayManager(commentsLeftToAction.length, numberOfComments, commentsLeftToAction);
}