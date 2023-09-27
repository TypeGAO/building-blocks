import { Meta, StoryObj } from "@storybook/react"
import ProgressBar from "./ProgressBar"

import "../../index.css"
import "../../styles/colors.css"
import "../../styles/spacing.css"

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  title: "ProgressBar",
}

export default meta

type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: {
    percentage: 50,
  },
}
