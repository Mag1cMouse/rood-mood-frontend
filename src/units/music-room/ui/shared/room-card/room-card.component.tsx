import { formatListeners, translateRoomName } from '../../../lib'
import type { Locale, TranslationKey } from '../../../lib'
import type { MusicRoom } from '../../../types'
import { Icon } from '../icon'
import { RoomArtwork } from '../room-artwork'

type Props = {
  room: MusicRoom
  locale: Locale
  t: (key: TranslationKey) => string
  onOpen: () => void
  onFavorite: () => void
  compact?: boolean
  large?: boolean
}

export const RoomCard = (props: Props) => {
  const { room, locale, t, onOpen, onFavorite, compact = false, large = false } = props
  const roomName = translateRoomName(locale, room.name)

  return (
    <article className="relative min-w-0">
      <button className={`relative flex w-full items-center gap-3 rounded-3xl border border-white/65 room-card-gradient py-3 pr-11 pl-3 text-left transition-transform duration-200 hover:-translate-y-1 max-compact:gap-2.5 ${large ? 'min-h-32' : compact ? 'min-h-26' : 'min-h-28'}`} onClick={onOpen} aria-label={`${t('openRoom')} ${roomName}`}>
        <RoomArtwork cover={room.cover} coverImage={room.coverImage} className={`max-compact:size-18 ${large ? 'size-24 rounded-2xl' : compact ? 'size-20 rounded-2xl' : 'size-20 rounded-2xl'}`} />
        <span className="grid min-w-0 flex-1 gap-1">
          <span className="flex items-center gap-2">
            <span className="rounded-full bg-room-black px-2.5 py-1 text-micro font-bold tracking-widest uppercase">{t('live')}</span>
            <span className="inline-flex h-4 items-center gap-0.5">
              <i className="h-2.5 w-1 rounded-full bg-room-gold animate-equalize" />
              <i className="h-4 w-1 rounded-full bg-room-gold animate-equalize animation-delay-250" />
              <i className="h-3 w-1 rounded-full bg-room-gold animate-equalize animation-delay-450" />
            </span>
          </span>
          <strong className={compact ? 'overflow-hidden text-sm text-ellipsis whitespace-nowrap' : 'overflow-hidden text-base text-ellipsis whitespace-nowrap'}>{roomName}</strong>
          <span className="text-room-small text-room-muted">{formatListeners(locale, room.listeners)}</span>
        </span>
        <Icon className={`absolute ${compact ? 'right-3' : 'right-3.5'}`} name="volume" size={24} />
      </button>
      <button className={`absolute top-4 right-3.5 z-10 grid size-7 place-items-center border-0 bg-transparent transition-transform duration-200 active:scale-90 ${room.isFavorite ? 'text-room-gold' : ''}`} onClick={onFavorite} aria-label={room.isFavorite ? t('removeFavorite') : t('addFavorite')}>
        <Icon name="heart" size={25} />
      </button>
    </article>
  )
}
