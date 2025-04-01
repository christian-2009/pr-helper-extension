import { dataExtractor } from './dataExtractor';
import { CommentData } from '../CommentData';
import { renderCommentInfo } from './renderer';

export function prHelperExtension() {
  const {
    unresolvedComments,
    numberOfComments,
    assignee,
    resolvedComments
  } = dataExtractor();

  const commentData = [...unresolvedComments].map((commentElement) => {
    return new CommentData(commentElement, assignee);
  });
  const actionedComments = commentData.filter((comment) => comment.hasBeenActioned);
  const numberActionedComments = resolvedComments.length + actionedComments.length;
  renderCommentInfo(numberActionedComments, numberOfComments);
}