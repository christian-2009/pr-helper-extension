import { CommentData } from './CommentData';

const unresolvedComments = document.querySelectorAll('div.js-comments-holder');
const resolvedComments = document.querySelectorAll('.js-toggle-outdated-comments')
const numberOfComments = unresolvedComments.length + resolvedComments.length;
const assignee = document.querySelector('.author')?.textContent ?? 'Unknown assignee'

const commentData = [...unresolvedComments].map((commentElement) => {
  return new CommentData(commentElement, assignee);
});

