# GitHub PR Comment Tracker

## Extension overview

This extension makes it easier to track comments on a GitHub PR

- It shows the number of comments that still need attention.
- It also displays a dropdown of these comments so you can easily find them.

## Technical overview

- App entry is in `main.ts`
  - This is where the changes to both the URL and the comments section are observed
  - If either of these are observed, we run the extension logic
- In `modules/index.ts`
  - Think of this as the brain of the extension
  - This essentially calls of the other modules that are relevant to the extension. This includes:
    - Extracting relevant data about the PR comments
    - Changing these comments into `CommentData.ts` objects
    - Rendering the extension on the page

## Release

To release the extension you need to:

- Update the `manifest.json` version
- Run the `prepare_release.sh` script to generate build of the dist directory
- Follow steps on Chrome
