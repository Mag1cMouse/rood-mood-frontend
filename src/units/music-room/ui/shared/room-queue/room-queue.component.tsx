import type { Locale, TranslationKey } from '../../../lib'
import { formatTrackCount, translateTrackTitle } from '../../../lib'
import type { MusicRoom } from '../../../types'
import { Icon } from '../icon'

type Props = {
  tracks: MusicRoom['queue']
  currentIndex: number
  locale: Locale
  t: (key: TranslationKey) => string
  onSelectTrack: (index: number) => void
}

export const RoomQueue = (props: Props) => {
  const { tracks, currentIndex, locale, t, onSelectTrack } = props

  return (
    <section className="mt-5 rounded-3xl border border-white/65 bg-white/25 px-3 py-4">
      <div className="mb-3.5 flex items-center justify-between text-eyebrow font-semibold tracking-widest text-room-text uppercase">{t('roomQueue')} <span className="text-xs font-normal tracking-normal text-gray-300 normal-case">{formatTrackCount(locale, tracks.length)}</span></div>
      {tracks.map((track, index) => (
        <button className={`flex w-full items-center gap-3 border-0 border-t border-white/15 bg-transparent px-1 py-3 text-left transition-colors duration-200 hover:bg-white/10 ${index === currentIndex ? 'text-room-gold' : ''}`} key={`${track.title}-${index}`} onClick={() => onSelectTrack(index)}>
          <span className={`w-6 text-xs ${index === currentIndex ? 'text-room-gold' : 'text-gray-300'}`}>{index === currentIndex ? '♫' : `0${index + 1}`}</span>
          <span className="grid flex-1 gap-1"><strong className="text-small">{translateTrackTitle(locale, track.title)}</strong><small className="text-xs text-gray-300">{track.artist}</small></span>
          <Icon name="play" size={18} />
        </button>
      ))}
    </section>
  )
}
