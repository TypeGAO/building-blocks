import { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import HostControls from "./HostControls"

import "../../index.css"
import "../../styles/colors.css"
import "../../styles/spacing.css"

const meta: Meta<typeof HostControls> = {
  component: HostControls,
  title: "HostControls",
}

export default meta

type Story = StoryObj<typeof HostControls>

export const Default: Story = {
  args: {
    controls: [
      {
        icon: <></>,
        label: "Fullscreen",
        onClick: action("onClick"),
      },
      {
        icon: <></>,
        label: "Settings",
        onClick: action("onClick"),
      },
    ],
  },
}
