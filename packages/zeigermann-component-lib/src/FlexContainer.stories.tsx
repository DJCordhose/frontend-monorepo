import React from "react";
import { Story, Meta } from "@storybook/react";

import { FlexContainer } from "./FlexContainer";

export default {
  title: "FlexContainer",
  component: FlexContainer,
} as Meta;

type Props = Parameters<typeof FlexContainer>[0];
const Template: Story<Props> = (args) => <FlexContainer {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  children: <p>Child</p>
} as Props;


export const Centered = Template.bind({});
Centered.args = {
  center: true,
  children: <p>Child</p>
} as Props;

