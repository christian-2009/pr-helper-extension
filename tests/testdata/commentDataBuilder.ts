import { CommentData } from '../../src/modules/CommentData';

export const buildCommentData = (initialCommentText: string, fileName: string) => {
  const mockCommentElement = document.createElement('div');
  const commentData = new CommentData(mockCommentElement, 'actual assignee');
  commentData.fileName = fileName;
  commentData.commentDescription = initialCommentText;
  return commentData;
};