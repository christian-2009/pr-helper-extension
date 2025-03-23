import { ASSIGNEE_SELECTOR, REACTION_SELECTOR } from './constants';

export class CommentData {
  hasBeenActioned: boolean;

  constructor(public commentElement: Element, public assignee: string) {
    this.hasBeenActioned = this.hasReaction() || this.isLastReplyFromAssignee()
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

  getCommentTitle = (commentElement: HTMLElement): string => {
    return 'harry potter';
  };
}