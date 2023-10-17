import { Meta, StoryObj } from "@storybook/react"
import Header from "./Header"

import "../../index.css"
import "../../styles/colors.css"
import "../../styles/spacing.css"

const meta: Meta<typeof Header> = {
  component: Header,
  title: "Header",
}

export default meta

type Story = StoryObj<typeof Header>

export const Default: Story = {
  args: {
    leftElement: <>Left JSX Element</>,
    rightElement: <>Right JSX Element</>,
  },
}
