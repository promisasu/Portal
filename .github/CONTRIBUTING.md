# Contributing

## Issue

1. Check that the issue has not already been reported ([search here](https://github.com/promisasu/Portal/issues)).
2. Document the steps that were followed that resulted in an error.
3. Document any error messages that were printed in the server log (`npm run log`).
4. Document any error messages that were printed in the browser log ( [chrome](https://developers.google.com/web/tools/chrome-devtools/debug/console/console-ui), [firefox](https://www.mozilla.org/en-US/firefox/developer/), [edge](https://dev.windows.com/en-us/microsoft-edge/platform/documentation/f12-devtools-guide/console/)).
5. Ensure any error messages or code snippets are noted with a [fenced code block](https://help.github.com/articles/github-flavored-markdown/#fenced-code-blocks).
6. Screenshots for UI errors are helpful.

## Pull Request

1. Commit code and push to Github

2. Open a [Pull Request](https://help.github.com/articles/using-pull-requests/) to `development` branch

3. Ensure that code passes tests

   * Test results are reported to [PR status](https://github.com/blog/1935-see-results-from-all-pull-request-status-checks)
   * Tests can be run locally using `npm run lint` and `npm run test`
   * Some lint errors can automatically resolved by running `npm run lint-fix`
   * Disabling tests is not fixing them

4. Get a code review

   * Reviewers are listed in `.pullapprove.yml`
   * A reviewer can approve a PR by writing a comment starting with `:+1:`, `LGTM`, or `:shipit:`
   * A review can reject a PR by writing a comment starting with `:-1:`

5. Merge

   * Any team member can merge an approved pull request
   * Your code is now part of the project :smile:
