import type { Locale } from '../../../lib'
import { formatListeners, translateRoomName } from '../../../lib'
import type { MusicRoom } from '../../../types'
import { Icon } from '../icon'
import { RoomArtwork } from '../room-artwork'

type Props = {
  rooms: MusicRoom[]
  locale: Locale
  yoursLabel: string
  addFavoriteLabel: string
  removeFavoriteLabel: string
  onOpenRoom: (roomId: string) => void
  onToggleFavorite: (roomId: string) => void
}

export const FeaturedRoomList = (props: Props) => {
  const { rooms, locale, yoursLabel, addFavoriteLabel, removeFavoriteLabel, onOpenRoom, onToggleFavorite } = props

  return (
    <div className="featured-rooms -mx-gutter flex gap-3 overflow-x-auto px-gutter pt-1 pb-2 scrollbar-none tablet:-mx-7 tablet:px-7 max-compact:-mx-4 max-compact:px-4">
      {rooms.map((room, index) => (
        <div className="relative shrink-0 basis-52" key={room.id}>
          <button className={`relative flex h-56 w-full min-w-0 flex-col items-start justify-end overflow-hidden rounded-3xl border border-white/65 featured-card-gradient p-4 text-left transition-transform duration-200 hover:-translate-y-1 animate-card-enter ${index === 1 ? 'animation-delay-80' : ''} ${index === 2 ? 'animation-delay-160' : ''}`} onClick={() => onOpenRoom(room.id)}>
            <RoomArtwork cover={room.cover} coverImage={room.coverImage} className="absolute inset-0 scale-110 opacity-50" />
            <span className="live-indicator-glow absolute top-5 right-5 size-2 rounded-full bg-white" />
            <strong className="relative z-10 max-w-full overflow-hidden text-featured-room text-ellipsis whitespace-nowrap">{translateRoomName(locale, room.name)}</strong>
            <span className="relative z-10 mt-1 text-room-small text-room-muted">{room.isMine ? yoursLabel : formatListeners(locale, room.listeners)}</span>
          </button>
          <button
            className={`absolute top-4 left-4 z-20 grid size-8 place-items-center border-0 bg-transparent p-0 text-white transition-transform duration-200 active:scale-90 ${room.isFavorite ? 'text-room-gold' : ''}`}
            onClick={() => onToggleFavorite(room.id)}
            aria-label={room.isFavorite ? removeFavoriteLabel : addFavoriteLabel}
          >
            <Icon name="heart" size={24} />
          </button>
        </div>
      ))}
    </div>
  )
}
