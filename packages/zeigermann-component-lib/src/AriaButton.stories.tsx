import React from "react";
import { Story, Meta } from "@storybook/react";

import { AriaButton } from "./AriaButton";

export default {
  title: "AriaButton",
  component: AriaButton,
} as Meta;

type Props = Parameters<typeof AriaButton>[0];
const Template: Story<Props> = (args) => <AriaButton {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  text: "Button",
  label: "Button",
} as Props;


export const Spinning = Template.bind({});
Spinning.args = {
  inProgress: true,
  text: "Button",
  label: "Button",
} as Props;

