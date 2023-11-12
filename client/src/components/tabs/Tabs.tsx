import React, {
  ReactNode,
  useState,
  Children,
  KeyboardEvent,
  useRef,
  useEffect,
} from "react"
import styles from "./Tabs.module.css"

interface TabsProps {
  children: ReactNode[]
}

function Tabs({ children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0)
  const tabsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Handle accessibility concerns with tabs

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        const newIndex =
          event.key === "ArrowRight"
            ? (activeTab + 1) % children.length
            : (activeTab - 1 + children.length) % children.length
        setActiveTab(newIndex)
      }
    }

    const currentTabsRef = tabsRef.current
    if (currentTabsRef) {
      currentTabsRef.addEventListener("keydown", handleKeyDown as any)
    }

    return () => {
      if (currentTabsRef) {
        currentTabsRef.removeEventListener("keydown", handleKeyDown as any)
      }
    }
  }, [activeTab, children.length])

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <div
      className={styles.tabContainer}
      ref={tabsRef}
      role="tablist"
      aria-label="Tabs"
    >
      <div className={styles.tabButtons}>
        {Children.map(children, (child, index) => {
          const tab = child as React.ReactElement<{ label: string }>

          return (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`${styles.tabButton} ${
                activeTab === index ? styles.active : ""
              }`}
              role="tab"
              aria-selected={activeTab === index}
              tabIndex={activeTab === index ? 0 : -1}
              aria-controls={`tabpanel-${index}`}
            >
              {tab.props.label}
            </button>
          )
        })}
      </div>

      <div
        className={styles.tabContent}
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        tabIndex={0}
      >
        {children && children[activeTab]}
      </div>
    </div>
  )
}

export default Tabs
