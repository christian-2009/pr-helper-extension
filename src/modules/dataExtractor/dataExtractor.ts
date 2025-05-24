import { ASSIGNEE_SELECTOR } from '../../constants';

export const dataExtractor = () => {
  const unresolvedComments = document.querySelectorAll(
    "[data-resolved = 'false']",
  );
  const resolvedComments = document.querySelectorAll(
    "[data-resolved = 'true']",
  );
  const numberOfTotalComments =
    unresolvedComments.length + resolvedComments.length;
  const assignee =
    document.querySelector(ASSIGNEE_SELECTOR)?.textContent ??
    'Unknown assignee';

  return {
    unresolvedComments,
    resolvedComments,
    numberOfComments: numberOfTotalComments,
    assignee,
  };
};
