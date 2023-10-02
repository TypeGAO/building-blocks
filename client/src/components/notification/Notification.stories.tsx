import { Meta, StoryObj } from "@storybook/react"

import Notification from "./Notification"

import "../../index.css"
import "../../styles/colors.css"
import "../../styles/spacing.css"

const meta: Meta<typeof Notification> = {
  component: Notification,
  title: "Notification",
  argTypes: {
    color: {
      options: ["green", "blue", "orange"],
      control: { type: "radio" },
    },
  },
}

export default meta

type Story = StoryObj<typeof Notification>

export const Default: Story = {
  args: {
    color: "green",
    children: "You are amazing",
  },
}
