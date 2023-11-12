import { ReactNode } from "react"

interface TabProps {
  label: string
  children: ReactNode
}

function Tab({ children }: TabProps) {
  return <>{children}</>
}

export default Tab
