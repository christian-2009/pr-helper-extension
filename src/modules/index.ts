import { dataExtractor } from './dataExtractor';
import { CommentData } from '../CommentData';
import { renderCommentInfo } from './renderer/renderer';

export function prHelperExtension() {
  const {
    unresolvedComments,
    numberOfComments,
    assignee
  } = dataExtractor();

  const unresolvedCommentData = [...unresolvedComments].map((commentElement) => {
    return new CommentData(commentElement, assignee);
  });
  const unactionedComments = unresolvedCommentData.filter((comment) => !comment.hasBeenActioned);

  renderCommentInfo(unactionedComments.length, numberOfComments, unactionedComments);
}