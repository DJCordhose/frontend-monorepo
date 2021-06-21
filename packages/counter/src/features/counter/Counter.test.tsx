import React from "react";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import { store } from "../../app/store";
import Counter from "./Counter";
import {
  configureBackend
} from './counterSlice';

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

beforeAll(() => {
  // to make sure app renders
  store.dispatch(configureBackend({
    url: process.env.PUBLIC_URL +'/mockapi/',
    suffix: '.json'
  }));

})

test("smoke: renders something", () => {
  const { getAllByText } = render(
    <Provider store={store}>
      <Counter />
    </Provider>
  );

  expect(getAllByText(/add/i)).toHaveLength(2);
});

test("handles click correctly", () => {
  render(
    <Provider store={store}>
      <Counter />
    </Provider>
  );

  expect(screen.getByRole("presentation")).toHaveTextContent("0");

  userEvent.click(screen.getByText("+"));
  
  expect(screen.getByRole("presentation")).toHaveTextContent("1");
});
