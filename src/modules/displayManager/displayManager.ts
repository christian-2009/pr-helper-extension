import { OUTER_CONTAINER_CLASS } from '../../constants';
import { CommentData } from '../CommentData';
import { renderCommentsLeftToAction } from './renderCommentsLeftToAction';
import { isCommentDetailsExpanded } from './helpers';

export const displayManager = (
  numberOfCommentsLeftToAction: number,
  totalNumberOfComments: number,
  comments: CommentData[]
) => {
  const expandCommentDetails = isCommentDetailsExpanded();
  removeCommentsLeftToActionElementFromScreen();
  if (!totalNumberOfComments) {
    return;
  }

  const hasResolvedAllComments = !!totalNumberOfComments && !numberOfCommentsLeftToAction;
  const commentsLeftToActionText = getCommentsLeftToActionText(totalNumberOfComments, numberOfCommentsLeftToAction, hasResolvedAllComments);

  renderCommentsLeftToAction(commentsLeftToActionText, comments, expandCommentDetails, !hasResolvedAllComments);
};

const removeCommentsLeftToActionElementFromScreen = () => {
  document.getElementById(OUTER_CONTAINER_CLASS)?.remove();
};

const getCommentsLeftToActionText = (
  totalNumberOfComments: number,
  numberOfCommentsLeftToAction: number,
  hasResolvedAllComments?: boolean
) => {

  return hasResolvedAllComments ? 'All comments have been actioned!' : `${numberOfCommentsLeftToAction} ${numberOfCommentsLeftToAction === 1 ? 'comment' : 'comments'} left to action (${totalNumberOfComments} total)`;
};
