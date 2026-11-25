import faviconUrl from '@assets/icons/favicon.svg?url'
import logoUrl from '@assets/icons/logo.svg?url'

import type { Locale, TranslationKey } from '../../../lib'
import { Icon } from '../icon'

type Props = {
  locale: Locale
  t: (key: TranslationKey) => string
  isHome: boolean
  onNavigateHome: () => void
  onNavigateProfile: () => void
  onToggleLocale: () => void
}

export const AppHeader = (props: Props) => {
  const { locale, t, isHome, onNavigateHome, onNavigateProfile, onToggleLocale } = props

  return (
    <header className="mb-8 flex h-14 items-center justify-between tablet:mb-10">
      <button className="flex items-center border-0 bg-transparent p-0" onClick={onNavigateHome} aria-label={t('homeLabel')}>
      <img className={isHome ? 'brand-logo-size block' : 'brand-favicon-size block'} src={isHome ? logoUrl : faviconUrl} alt="" />
      </button>
    <div className="flex items-center gap-2">
      <button className="size-12 rounded-full border border-white/45 bg-white/15 px-2 text-caption font-bold tracking-wide transition-colors duration-200 hover:border-room-gold hover:text-room-gold" onClick={onToggleLocale} aria-label={t('languageLabel')}>{locale.toUpperCase()}</button>
        <button className="grid size-12 place-items-center rounded-full border border-white/65 bg-white/15" onClick={onNavigateProfile} aria-label={t('profileLabel')}><Icon name="user" size={23} /></button>
      </div>
    </header>
  )
}
