# Contributing

## Issue

1. Check that the issue has not already been reported ([search here](https://github.com/promisasu/Portal/issues))

2. Fill in the [Issue Template](ISSUE_TEMPLATE.md)

3. Include any relevant logs

   * server logs from the `logs` folder
   * browser logs from the developer console ( [chrome](https://developers.google.com/web/tools/chrome-devtools/debug/console/console-ui), [firefox](https://www.mozilla.org/en-US/firefox/developer/), [edge](https://dev.windows.com/en-us/microsoft-edge/platform/documentation/f12-devtools-guide/console/))

4. Ensure any error messages or code snippets are noted with a [fenced code block](https://help.github.com/articles/github-flavored-markdown/#fenced-code-blocks)

5. Screenshots for UI errors are helpful

## Pull Request

1. Commit code and push to Github

2. Open a [Pull Request](https://help.github.com/articles/using-pull-requests/) to `development` branch

3. Fill out the information requested in the [Pull Request Template](PULL_REQUEST_TEMPLATE.md)

4. Ensure that code passes tests

   * Test results are reported to [PR status](https://github.com/blog/1935-see-results-from-all-pull-request-status-checks)
   * Tests can be run locally using `npm run lint` and `npm test`
   * Some lint errors can automatically resolved by running `npm run lint-fix`
   * Disabling tests is not fixing them

5. Get a code review

   * A reviewer can approve a PR by writing a comment starting with `Approved`, `LGTM`, or `:shipit:`
   * A review can reject a PR by writing a comment starting with `Rejected`

6. Merge

   * Any team member can merge an approved pull request
   * Your code is now part of the project :smile:

## Code Review

1. Ensure Pull Request is to correct branch
2. Ensure Pull Request fills in the [Pull Request Template](PULL_REQUEST_TEMPLATE.md)
3. Ensure code passes tests and lint checks pass (reported to [PR status](https://github.com/blog/1935-see-results-from-all-pull-request-status-checks))
4. Ensure functionality meets acceptance criteria for user story or issue
5. Ensure new functionality has tests
6. Ensure no tests or lint checks have been needlessly disabled
7. Ensure new code makes sense and is readable

## How-To

* [Use Git](https://git-scm.com/doc)
* [Use Github Pull Requests](https://help.github.com/articles/using-pull-requests/)
* [Use Javascript](http://www.w3schools.com/js/)
* [Use Node JS](https://nodejs.org/api/documentation.html)
* [Use NPM](https://docs.npmjs.com/)
* [Use Hapi](http://hapijs.com/tutorials)
* [Use ESLint](http://eslint.org)
* [Use Markdown](https://help.github.com/articles/markdown-basics/)
