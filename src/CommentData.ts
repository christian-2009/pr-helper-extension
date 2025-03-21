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
    return lastReply.querySelector('.author')?.textContent === this.assignee;
  };

  hasReaction = () => !!this.commentElement.querySelector('.social-reaction-summary-item')?.textContent;

  getCommentTitle = (commentElement: HTMLElement): string => {
    return 'harry potter';
  };
}