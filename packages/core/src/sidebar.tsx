import {
  createContext,
  useState,
  type ReactElement,
  type ReactNode,
} from "react"

type SidebarContextType = [open: boolean, setOpen: (value: boolean) => void]

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export interface SidebarProviderProps {
  open?: boolean
  onOpenChange?: (v: boolean) => void
  children: ReactNode
}

export function SidebarProvider({
  open,
  onOpenChange,
  children,
}: SidebarProviderProps): ReactElement {
  const [openInner, setOpenInner] = useState(false)

  return (
    <SidebarContext.Provider
      value={[open ?? openInner, onOpenChange ?? setOpenInner]}
    >
      {children}
    </SidebarContext.Provider>
  )
}
