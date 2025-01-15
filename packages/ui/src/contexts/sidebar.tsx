import {
  createContext,
  PropsWithChildren,
  type ReactNode,
  type RefObject,
} from "react"

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
  return <>{children}</>
}
