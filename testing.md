# Testing

https://2020.stateofjs.com/en-US/technologies/testing/

### Testing Style

![Role of UI](./role-of-ui.png)

* UI is the most volatile, make sure you do not constrain yourself too much
* UI logic is less volatile and might require a bit more testing
* UI obviously is about how graphical elements look like and how they behave
* E2E-Tests are most natural for testing (in the ideal world only, unfortunately)
* They can be slow and brittle and need addition with other forms of testing (order expresses importance)
  * manual
  * type checker
  * unit
  * integration

### Testing
- `yarn test`
- `yarn e2e`
- https://nilshartmann.github.io/react-training/2020_1211_react.html#/118
- https://reactjs.org/docs/testing.html
- runner for node based unit tests: https://jestjs.io/
  - smoke: does the component render at all (without throwing)?
  - snapshot (https://jestjs.io/docs/en/snapshot-testing, https://reactjs.org/docs/test-renderer.html): only advisable to use as golden master when checking against external (REST) API  
  - full: render to HTML and check lifecycle methods
  - logic: pure unit test for reducers
- https://testing-library.com/docs/react-testing-library/intro/
  - Advocates role based selectors
    - https://www.w3.org/TR/wai-aria/#role_definitions
  - testid is alternative (might not be applicable when using component library)
    - https://testing-library.com/docs/dom-testing-library/faq
    - What if my app is localized and I don't have access to the text in test?
      - This is fairly common. Our first bit of advice is to try to get the default text used in your tests. That will make everything much easier (more than just using this utility). If that's not possible, then you're probably best to just stick with data-testids (which is not bad anyway).
  - https://testing-library.com/docs/guide-which-query
- Testing Redux: https://redux.js.org/recipes/writing-tests
  - some basic tests are made obsolete by redux toolkit and TypeScript checking
- Testing i18n with mocked hook: https://react.i18next.com/misc/testing
- https://www.browserstack.com
- https://fakerapi.it/en

### End-to-End-Tests
* Testcafe
  - https://devexpress.github.io/testcafe/
  - https://testing-library.com/docs/testcafe-testing-library/intro
  - https://devexpress.github.io/testcafe/media/team-blog/randomize-your-end-to-end-tests-how-to-generate-input-data-for-testcafe.html


### Visual Regression Tests

- http://yahoo.github.io/blink-diff/
  - https://github.com/yahoo/blink-diff
- https://github.com/tacoss/testcafe-blink-diff

All functional tests may pass, but application might still be ugly or even broken
![Tesing Sucks](./testing-sucks.gif)

![Tesing Sucks 2](./testing-sucks-2.gif)

Visual regressions test against a golden master

* create golder master: `yarn e2e:visual:snapshot`
* create test snapshot: `yarn e2e:visual:test`
* compare, create report and fail if deviation is above threshold: `yarn e2e:visual:compare`

