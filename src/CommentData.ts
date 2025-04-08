import { ASSIGNEE_SELECTOR, REACTION_SELECTOR } from './constants';

export class CommentData {
  hasBeenActioned: boolean;
  commentDescription: string;
  fileName: string;

  constructor(public commentElement: Element, public assignee: string) {
    this.hasBeenActioned = this.hasReaction();
    this.commentDescription = this.getCommentDescription();
    this.fileName = this.getFileName();
  }

  isLastReplyFromAssignee = () => {
    const replies = this.commentElement.children;
    const hasReplies = this.commentElement.children.length > 1;
    if (!hasReplies) {
      return false;
    }

    const lastReply = replies[replies.length - 1];
    return lastReply.querySelector(ASSIGNEE_SELECTOR)?.textContent === this.assignee;
  };

  hasReaction = () => !!this.commentElement.querySelector(REACTION_SELECTOR)?.textContent;

  getCommentDescription = (): string =>
    this.commentElement.querySelectorAll('.js-comment-body')[0]?.textContent?.trim() ?? '';

  getFileName = (): string => {
    const fileElementsInPr = document.querySelectorAll('.js-file.js-details-container');
    let fileElementCommentIsIn;

    for (const file of fileElementsInPr) {
      if (file.contains(this.commentElement)) {
        fileElementCommentIsIn = file;
      }
    }

    return fileElementCommentIsIn?.querySelector('.Link--primary.Truncate-text')?.textContent ?? '';
  };
}