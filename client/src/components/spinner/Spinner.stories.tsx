import { Meta, StoryObj } from "@storybook/react"
import Spinner from "./Spinner"

import "../../index.css"
import "../../styles/colors.css"
import "../../styles/spacing.css"

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  title: "Spinner",
  argTypes: {
    color: {
      options: ["neutral", "inverse", "blue"],
      control: { type: "radio" },
    },
    size: {
      options: ["md", "lg"],
      control: { type: "radio" },
    },
  },
}

export default meta

type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  args: {
    color: "neutral",
    size: "lg",
  },
}
