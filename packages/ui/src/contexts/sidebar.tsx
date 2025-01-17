import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react"
import { usePathname } from "next/navigation"
import { SidebarProvider as BaseProvider } from "@tafiui/core/sidebar"

// import { SidebarProvider as BaseProvider } from "fumadocs-core/sidebar"

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

export function useSidebar(): SidebarContext {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error("Missing root provider")
  return ctx
}

export function SidebarProvider({
  children,
}: {
  children: ReactNode
}): ReactNode {
  const closeOnRedirect = useRef(true)
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const pathname = usePathname()

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
      <BaseProvider open={open} onOpenChange={setOpen}>
        {children}
      </BaseProvider>
    </SidebarContext.Provider>
  )
}
