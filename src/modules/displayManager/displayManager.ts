import { OUTER_CONTAINER_CLASS } from '../../constants';
import { CommentData } from '../../CommentData';
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

  const commentsLeftToActionText = `${numberOfCommentsLeftToAction} ${numberOfCommentsLeftToAction === 1 ? 'comment' : 'comments'} left to action (${totalNumberOfComments} total)`;
  renderCommentsLeftToAction(commentsLeftToActionText, comments, expandCommentDetails);
};

const removeCommentsLeftToActionElementFromScreen = () => {
  document.getElementById(OUTER_CONTAINER_CLASS)?.remove();
};
