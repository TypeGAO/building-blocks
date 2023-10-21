import { Meta, StoryObj } from "@storybook/react"
import SpinnerOverlay from "./SpinnerOverlay"

import "../../index.css"
import "../../styles/colors.css"
import "../../styles/spacing.css"

const meta: Meta<typeof SpinnerOverlay> = {
  component: SpinnerOverlay,
  title: "SpinnerOverlay",
}

export default meta

type Story = StoryObj<typeof SpinnerOverlay>

export const Default: Story = {
  args: {
    label: "Connecting",
  },
}
