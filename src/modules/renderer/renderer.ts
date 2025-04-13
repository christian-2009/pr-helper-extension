import { OUTER_CONTAINER_CLASS } from '../../constants';
import { CommentData } from '../../CommentData';
import { renderCommentsLeftToAction } from './renderCommentsLeftToAction';
import { isCommentDetailsExpanded } from './utils';

export const renderCommentInfo = (
  numberOfCommentsLeftToAction: number,
  totalNumberOfComments: number,
  comments: CommentData[]
) => {
  removeCommentsLeftToActionElementFromScreen();
  if (!totalNumberOfComments) {
    return;
  }

  const commentsLeftToActionText = `${numberOfCommentsLeftToAction} ${numberOfCommentsLeftToAction === 1 ? 'comment' : 'comments'} left to action (${totalNumberOfComments} total)`;
  renderCommentsLeftToAction(commentsLeftToActionText, comments, isCommentDetailsExpanded());
};

const removeCommentsLeftToActionElementFromScreen = () => {
  document.getElementById(OUTER_CONTAINER_CLASS)?.remove();
};
