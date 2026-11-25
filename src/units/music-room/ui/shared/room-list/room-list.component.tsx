import type { Locale, TranslationKey } from '../../../lib'
import type { MusicRoom } from '../../../types'
import { RoomCard } from '../room-card'

type Props = {
  rooms: MusicRoom[]
  locale: Locale
  t: (key: TranslationKey) => string
  onOpenRoom: (roomId: string) => void
  onToggleFavorite: (roomId: string) => void
  compact?: boolean
  large?: boolean
}

export const RoomList = (props: Props) => {
  const { rooms, locale, t, onOpenRoom, onToggleFavorite, compact = false, large = false } = props

  return (
    <div className="grid gap-3">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          locale={locale}
          t={t}
          onOpen={() => onOpenRoom(room.id)}
          onFavorite={() => onToggleFavorite(room.id)}
          compact={compact}
          large={large}
        />
      ))}
    </div>
  )
}
