import type { ReactNode } from 'react'

type IconProps = {
  children: ReactNode
}

export function Icon({ children }: IconProps) {
  return (
    <svg className="ui-icon" viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  )
}
