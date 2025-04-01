import { prHelperExtension } from './modules';
import { COMMENTS_SELECTOR, PR_FILES_URL_REGEX, REACTION_SELECTOR } from './constants';

const observeUrlChange = (isInitialLoad: boolean) => {
  let oldHref = document.location.href;

  if (isInitialLoad && doesUrlMatchPrFileViewUrl(oldHref)) {
    prHelperExtension();
    observeCommentsChange();
  }

  // callback to be run when href changes
  const observer = new MutationObserver(() => {
    const newHref = document.location.href;
    if (oldHref !== newHref) {
      oldHref = newHref;
    }

    if (doesUrlMatchPrFileViewUrl(oldHref)) {
      observeCommentsChange();
      prHelperExtension();
    }
  });

  observer.observe(document, {
    attributes: true,
    subtree: true,
    attributeFilter: ['href']
  });
};

const observeCommentsChange = () => {
  const commentsChangeContainer = document.querySelector('.js-diff-container');
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.removedNodes.forEach((node) => {
        // when emoji reaction removed
        if (node instanceof HTMLElement && node.querySelector(REACTION_SELECTOR)) {
          prHelperExtension();
        }
        // when comment resolved
        if (node instanceof HTMLElement && node.querySelector(COMMENTS_SELECTOR)) {
          prHelperExtension();
        }
      });

      mutation.addedNodes.forEach((node) => {
        // when emoji is added
        if (node instanceof HTMLElement && node.querySelector(REACTION_SELECTOR)) {
          prHelperExtension();
        }
        // when comment added
        if (node instanceof HTMLElement && node.querySelector(COMMENTS_SELECTOR)) {
          prHelperExtension();
        }
      });
    });
  });
  observer.observe(commentsChangeContainer!!, { childList: true, subtree: true });
};

const doesUrlMatchPrFileViewUrl = (url: string) => PR_FILES_URL_REGEX.test(url);

window.addEventListener('load', () => {
  observeUrlChange(true);
});


