import { prHelperExtension } from './modules';
import { PR_FILES_URL_REGEX } from './constants';

const observeUrlChange = (isInitialLoad: boolean) => {
  let oldHref = document.location.href;

  if (isInitialLoad && doesUrlMatchPrFileViewUrl(oldHref)) {
    prHelperExtension();
  }

  // callback to be run when href changes
  const observer = new MutationObserver(_ => {
    const newHref = document.location.href;
    if (oldHref !== newHref) {
      oldHref = newHref;
    }

    if (doesUrlMatchPrFileViewUrl(oldHref)) {
      prHelperExtension();
    }
  });

  observer.observe(document, {
    attributes: true,
    subtree: true,
    attributeFilter: ['href']
  });
};

const doesUrlMatchPrFileViewUrl = (url: string) => PR_FILES_URL_REGEX.test(url);

window.addEventListener('load', () => {
  observeUrlChange(true);
});

