import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { AriaButton, FlexContainer } from "zeigermann-component-lib";
test("AriaButton renders as expected", () => {
  const onClick = jest.fn();

  const tree = renderer
    .create(
      <AriaButton
        testid="language:switch:de"
        label="Change Language"
        text="Deutsch"
        onClick={onClick}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("AriaButton click triggers callback as expected", () => {
  const onClick = jest.fn();
  const label = "Change Language";

  render(
    <AriaButton
      testid="language:switch:de"
      label={label}
      text="Deutsch"
      onClick={onClick}
    />
  );

  userEvent.click(screen.getByLabelText(label));
  expect(onClick).toHaveBeenCalled();
});

test("FlexContainer renders as expected", () => {
  const tree = renderer
    .create(
      <>
        <FlexContainer>
          <p></p>
        </FlexContainer>
        <FlexContainer center={true}>
          <p></p>
        </FlexContainer>
      </>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
