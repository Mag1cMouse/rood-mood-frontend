import type { MusicRoomFilter, MusicRoomPage } from '../../../types'
import type { TranslationKey } from '../../../lib'
import type { IconName } from '../icon'
import { Icon } from '../icon'

type Props = {
  page: MusicRoomPage
  roomFilter: MusicRoomFilter
  t: (key: TranslationKey) => string
  onNavigate: (target: MusicRoomPage | 'favorites') => void
}

const NavigationItems = [
  { target: 'home', label: 'home', icon: 'home' },
  { target: 'rooms', label: 'rooms', icon: 'search' },
  { target: 'favorites', label: 'favorites', icon: 'music' },
  { target: 'profile', label: 'profile', icon: 'user' },
] as const satisfies { target: MusicRoomPage | 'favorites'; label: TranslationKey; icon: IconName }[]

export const BottomNavigation = (props: Props) => {
  const { page, roomFilter, t, onNavigate } = props

  const renderItem = (item: typeof NavigationItems[number]) => {
    const isActive = item.target === 'favorites'
      ? page === 'rooms' && roomFilter === 'favorites'
      : page === item.target

    return (
      <button
        key={item.target}
        className={`grid min-w-0 flex-1 justify-items-center gap-1 rounded-xl border-0 bg-transparent px-px py-1 transition active:scale-95 ${isActive ? 'text-room-gold' : 'text-gray-300'}`}
        onClick={() => onNavigate(item.target)}
        aria-current={isActive ? 'page' : undefined}
      >
        <Icon name={item.icon} size={21} />
        <span className="text-micro leading-none whitespace-nowrap">{t(item.label)}</span>
      </button>
    )
  }

  return (
    <nav className="safe-navigation-position fixed z-10 left-1/2 flex min-h-16 -translate-x-1/2 items-center rounded-full border border-white/75 bg-white/25 px-2 py-1 room-navigation-shadow backdrop-blur-lg max-compact:px-1" aria-label={t('mainNavigation')}>
      {NavigationItems.map(renderItem)}
    </nav>
  )
}
