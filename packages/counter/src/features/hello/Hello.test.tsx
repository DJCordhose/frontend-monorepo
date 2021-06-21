import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import Hello from "./Hello";
import { BrowserRouter as Router } from "react-router-dom";

// https://react.i18next.com/misc/testing
jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

// https://jestjs.io/docs/en/snapshot-testing
test("snapshot: renders correctly", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Router>
          <Hello />
        </Router>
      </Provider>
    )
    .toJSON();
    
  expect(tree).toMatchSnapshot();
});
