import { ASSIGNEE_SELECTOR, RESOLVED_COMMENTS_SELECTOR, UNRESOLVED_COMMENTS_SELECTOR } from '../constants';

export const dataExtractor = () => {

  const unresolvedComments = document.querySelectorAll(UNRESOLVED_COMMENTS_SELECTOR);
  const resolvedComments = document.querySelectorAll(RESOLVED_COMMENTS_SELECTOR)
  const numberOfTotalComments = unresolvedComments.length + resolvedComments.length;
  const assignee = document.querySelector(ASSIGNEE_SELECTOR)?.textContent ?? 'Unknown assignee'

  return {
    unresolvedComments,
    resolvedComments,
    numberOfComments: numberOfTotalComments,
    assignee,
  }
}