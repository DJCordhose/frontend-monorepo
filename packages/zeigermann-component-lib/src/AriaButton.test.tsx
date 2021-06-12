import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AriaButton } from "./AriaButton";

test("smoke: renders its text", () => {
  const label = "Click mich";
  const { getAllByText } = render(
    <AriaButton
      testid="oha"
      label={label}
      text={label}
      onClick={() => {}}
    ></AriaButton>
  );

  expect(getAllByText(label)).toHaveLength(1);
});

test("click trigges callback", () => {
  const onClick = jest.fn()
  const label = "Click mich";
  render(
    <AriaButton
      testid="oha"
      label={label}
      text={label}
      onClick={onClick}
    ></AriaButton>
  );

  userEvent.click(screen.getByText(label));
  expect(onClick).toHaveBeenCalled();
});
