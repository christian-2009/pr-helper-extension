import { prHelperExtension } from './modules';
import { COMMENTS_SELECTOR, PR_FILES_URL_REGEX, REACTION_SELECTOR } from './constants';

const observeUrlChange = (isInitialLoad: boolean) => {
  let oldHref = document.location.href;

  if (isInitialLoad && doesUrlMatchPrFileViewUrl(oldHref)) {
    prHelperExtension();
    observeChangesToComments();
  }

  // callback to be run when href changes
  const observer = new MutationObserver(() => {
    const newHref = document.location.href;
    if (oldHref !== newHref) {
      oldHref = newHref;
    }

    if (doesUrlMatchPrFileViewUrl(oldHref)) {
      observeChangesToComments();
      prHelperExtension();
    }
  });

  observer.observe(document, {
    attributes: true,
    subtree: true,
    attributeFilter: ['href']
  });
};

const observeChangesToComments = () => {
  const commentsChangeContainer = document.querySelector('.js-diff-container');
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.removedNodes.forEach((node) => {
        if (node instanceof HTMLElement && (elementIsReaction(node) || elementIsComment(node))) {
          prHelperExtension();
        }
      });

      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement && (elementIsReaction(node) || elementIsComment(node))) {
          prHelperExtension();
        }
      });
    });
  });
  observer.observe(commentsChangeContainer!!, { childList: true, subtree: true });
};

const elementIsReaction = (node: HTMLElement) => node.querySelector(REACTION_SELECTOR);

const elementIsComment = (node: HTMLElement) => node.querySelector(COMMENTS_SELECTOR);

const doesUrlMatchPrFileViewUrl = (url: string) => PR_FILES_URL_REGEX.test(url);

window.addEventListener('load', () => {
  observeUrlChange(true);
});


