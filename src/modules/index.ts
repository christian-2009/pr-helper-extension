import { dataExtractor } from './dataExtractor';
import { CommentData } from '../CommentData';
import { renderCommentInfo } from './renderer';

export function prHelperExtension() {
  const {
    unresolvedComments,
    numberOfComments,
    assignee
  } = dataExtractor();

  const commentData = [...unresolvedComments].map((commentElement) => {
    return new CommentData(commentElement, assignee);
  });
  const unactionedComments = commentData.filter((comment) => !comment.hasBeenActioned);
  const numberActionedComments = numberOfComments - unactionedComments.length;
  renderCommentInfo(numberActionedComments, numberOfComments);
}