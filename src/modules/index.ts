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

  const unresolvedCommentData = [...unresolvedComments].map((commentElement) => {
    return new CommentData(commentElement, assignee);
  });
  const actionedComments = unresolvedCommentData.filter((comment) => comment.hasBeenActioned);
  const numberOfActionedComments = resolvedComments.length + actionedComments.length;

  renderCommentInfo(numberOfActionedComments, numberOfComments);
}