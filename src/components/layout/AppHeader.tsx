import { BrandMark } from '../common/BrandMark'

export function AppHeader() {
  return (
    <header className="topbar">
      <div className="shell-width header-brand">
        <BrandMark />
        <div>
          <strong>DiagnoVetis</strong>
          <span>IFES Santa Teresa</span>
        </div>
      </div>
    </header>
  )
}
