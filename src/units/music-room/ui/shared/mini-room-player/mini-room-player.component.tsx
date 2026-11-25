import { translateRoomName, translateTrackTitle } from '../../../lib'
import type { Locale, TranslationKey } from '../../../lib'
import type { MusicRoom, MusicTrack } from '../../../types'
import { Icon } from '../icon'
import { RoomArtwork } from '../room-artwork'

type Props = {
  room: MusicRoom
  track: MusicTrack
  locale: Locale
  isPlaying: boolean
  t: (key: TranslationKey) => string
  onOpenRoom: () => void
  onTogglePlayback: () => void
}

export const MiniRoomPlayer = (props: Props) => {
  const { room, track, locale, isPlaying, t, onOpenRoom, onTogglePlayback } = props
  const roomName = translateRoomName(locale, room.name)
  const trackTitle = translateTrackTitle(locale, track.title)

  return (
    <aside className="mini-room-player-position z-20">
      <div className="flex min-h-16 items-center gap-2 rounded-2xl border border-white/65 bg-room-toast/90 p-2.5 shadow-xl backdrop-blur-lg animate-mini-room-enter">
        <button
          className="flex min-w-0 flex-1 items-center gap-3 border-0 bg-transparent p-0 text-left"
          onClick={onOpenRoom}
          aria-label={`${t('openRoom')} ${roomName}`}
        >
          <RoomArtwork cover={room.cover} coverImage={room.coverImage} className="size-11 rounded-xl" showDetails={false} />
          <span className="grid min-w-0 flex-1 gap-0.5">
            <strong className="overflow-hidden text-xs text-ellipsis whitespace-nowrap">{roomName}</strong>
            <span className="overflow-hidden text-xs text-ellipsis whitespace-nowrap text-gray-300">{trackTitle} · {track.artist}</span>
          </span>
          <Icon name="arrow" size={17} />
        </button>
        <button
          className="grid size-11 shrink-0 place-items-center rounded-full border border-white/50 bg-white/15"
          onClick={onTogglePlayback}
          aria-label={t(isPlaying ? 'pause' : 'resume')}
        >
          <Icon name={isPlaying ? 'pause' : 'play'} size={19} />
        </button>
      </div>
    </aside>
  )
}
