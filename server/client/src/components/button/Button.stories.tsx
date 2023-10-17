import { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import Button from "./Button"

import "../../index.css"
import "../../styles/colors.css"
import "../../styles/spacing.css"

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Button",
  argTypes: {
    color: {
      options: ["green", "blue", "neutral"],
      control: { type: "radio" },
    },
    size: {
      options: ["md", "lg"],
      control: { type: "radio" },
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    color: "green",
    size: "md",
    children: "Run",
    disabled: false,
    onClick: action("onClick"),
  },
}
