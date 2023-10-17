import { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import Input from "./Input"

import "../../index.css"
import "../../styles/colors.css"
import "../../styles/spacing.css"

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Inputs",
  argTypes: {
    size: {
      options: ["md", "lg"],
      control: { type: "radio" },
    },
  },
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    value: "Test",
    size: "md",
    placeholder: "Game PIN",
    error: false,
    onChange: action("onChange"),
  },
}
