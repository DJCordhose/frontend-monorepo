import React from "react";
import { Story, Meta } from "@storybook/react";

import { LoadingIndicator } from "./LoadingIndicator";

export default {
  title: "LoadingIndicator",
  component: LoadingIndicator,
} as Meta;

type Props = Parameters<typeof LoadingIndicator>[0];
const Template: Story<Props> = (args) => <LoadingIndicator {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  title: "Loading Configuration...",
} as Props;
