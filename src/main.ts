import { prHelperExtension } from './modules';
import { PR_FILES_URL_REGEX } from './constants';

const observeUrlChange = () => {
  let oldHref = document.location.href;

  // callback to be run when href changes
  const observer = new MutationObserver(_ => {
    const newHref = document.location.href;
    if (oldHref !== newHref) {
      oldHref = newHref;
    }
    if (PR_FILES_URL_REGEX.test(oldHref)) {
      prHelperExtension();
    }
  });

  observer.observe(document, {
    attributes: true,
    subtree: true,
    attributeFilter: ['href']
  });
};

window.addEventListener('load', () => {
  prHelperExtension();
  observeUrlChange();
});

