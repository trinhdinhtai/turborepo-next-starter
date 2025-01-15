import {
  createContext,
  PropsWithChildren,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react"
import { SidebarProvider as BaseSidebarProvider } from "@tafiui/core/sidebar"

interface SidebarContext {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>

  /**
   * When set to false, don't close the sidebar when navigate to another page
   */
  closeOnRedirect: RefObject<boolean>
}

const SidebarContext = createContext<SidebarContext | undefined>(undefined)

export function SidebarProvider({ children }: PropsWithChildren): ReactNode {
  const closeOnRedirect = useRef(true)
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <SidebarContext.Provider
      value={useMemo(
        () => ({
          open,
          setOpen,
          collapsed,
          setCollapsed,
          closeOnRedirect,
        }),
        [open, collapsed]
      )}
    >
      <BaseSidebarProvider open={open} onOpenChange={setOpen}>
        {children}
      </BaseSidebarProvider>
    </SidebarContext.Provider>
  )
}
