import { CommentData } from '../CommentData';
import {
  COMMENT_DETAILS_CONTAINER_CLASS,
  COMMENT_DETAILS_FOR_FILE_CLASS,
  COMMENTS_LEFT_TO_ACTION_HEADER_CLASS,
  INNER_CONTAINER_CLASS,
  OUTER_CONTAINER_CLASS,
  PR_HEADER_CONTAINER_SELECTOR,
} from '../../constants';
import { createDivElement } from './helpers';

export const renderCommentsLeftToAction = (
  commentsLeftToActionText: string,
  comments: CommentData[],
  expandCommentDetails: boolean,
  showDropdownIcon: boolean = true,
) => {
  const headerContainer = document.querySelector(PR_HEADER_CONTAINER_SELECTOR);

  //need to add id to use getElementById if removing actioned comments from screen
  const outerContainer = createDivElement(
    OUTER_CONTAINER_CLASS,
    undefined,
    OUTER_CONTAINER_CLASS,
  );

  const innerContainer = createDivElement(INNER_CONTAINER_CLASS);

  const commentsLeftToActionElementContainer = createDivElement(
    COMMENTS_LEFT_TO_ACTION_HEADER_CLASS,
    commentsLeftToActionText,
  );

  let dropdownIcon = document.createElement('span');
  dropdownIcon.classList.add('arrow', 'right');
  dropdownIcon.setAttribute('data-testid', 'dropdown-icon');
  showDropdownIcon &&
    commentsLeftToActionElementContainer.appendChild(dropdownIcon);

  const commentDetailsContainer = createDivElement(
    COMMENT_DETAILS_CONTAINER_CLASS,
  );
  commentDetailsContainer.style.display = expandCommentDetails
    ? 'flex'
    : 'none';
  commentsLeftToActionElementContainer.addEventListener('click', () => {
    if (commentDetailsContainer.style.display === 'none') {
      commentDetailsContainer.style.display = 'flex';
      dropdownIcon.classList.remove('right');
      dropdownIcon.classList.add('down');
    } else {
      commentDetailsContainer.style.display = 'none';
      dropdownIcon.classList.remove('down');
      dropdownIcon.classList.add('right');
    }
  });

  addCommentDetailsToContainer(commentDetailsContainer, comments);

  innerContainer?.append(
    commentsLeftToActionElementContainer,
    commentDetailsContainer,
  );
  outerContainer?.appendChild(innerContainer);
  headerContainer?.appendChild(outerContainer);
};

const addCommentDetailsToContainer = (
  commentDetailsContainer: HTMLDivElement,
  comments: CommentData[],
) => {
  for (const comment of comments) {
    const commentDetail = createDivElement(COMMENT_DETAILS_FOR_FILE_CLASS);
    const commentDetailText = createDivElement(
      'comment-text',
      comment.commentDescription,
    );
    commentDetail.addEventListener('click', () => {
      comment.commentElement.scrollIntoView({ behavior: 'smooth' });
    });
    const commentDetailFileName = createDivElement(
      'comment-file',
      comment.fileName,
    );

    commentDetail.append(commentDetailText, commentDetailFileName);
    commentDetailsContainer.appendChild(commentDetail);
  }
};
