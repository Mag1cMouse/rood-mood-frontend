import repeatUrl from '@assets/icons/repeat.svg?url'
import reverseUrl from '@assets/icons/reverse.svg?url'

import type { TranslationKey } from '../../../lib'
import type { IconName } from '../icon'
import { Icon } from '../icon'

type Props = {
  t: (key: TranslationKey) => string
  trackCount: number
  trackIndex: number
  isPlaying: boolean
  onTrackChange: (index: number) => void
  onTogglePlayback: () => void
}

type Control = {
  key: string
  label: TranslationKey
  icon?: IconName
  asset?: string
  className?: string
  onClick: () => void
}

export const PlayerControls = (props: Props) => {
  const { t, trackCount, trackIndex, isPlaying, onTrackChange, onTogglePlayback } = props
  const controls: Control[] = [
    { key: 'shuffle', label: 'shuffle', asset: reverseUrl, onClick: () => onTrackChange((trackIndex + 1) % trackCount) },
    { key: 'previous', label: 'previousTrack', icon: 'next', className: 'rotate-180', onClick: () => onTrackChange((trackIndex - 1 + trackCount) % trackCount) },
    { key: 'playback', label: isPlaying ? 'pause' : 'resume', icon: isPlaying ? 'pause' : 'play', className: 'size-12 rounded-full bg-white text-room-ink', onClick: onTogglePlayback },
    { key: 'next', label: 'nextTrack', icon: 'next', onClick: () => onTrackChange((trackIndex + 1) % trackCount) },
    { key: 'repeat', label: 'repeat', asset: repeatUrl, onClick: () => onTrackChange(trackIndex) },
  ] as const

  return (
    <div className="mt-2.5 flex items-center justify-between">
      {controls.map((control) => (
        <button
          key={control.key}
          className={`grid size-10 place-items-center border-0 bg-transparent text-2xl transition-transform duration-200 active:scale-90 ${control.className ?? ''} ${control.key === 'playback' && isPlaying ? 'animate-play-pulse' : ''}`}
          aria-label={t(control.label)}
          onClick={control.onClick}
        >
          {control.asset
            ? <img className="block size-9" src={control.asset} alt="" />
            : control.icon && <Icon name={control.icon} size={control.key === 'playback' ? 19 : 21} />}
        </button>
      ))}
    </div>
  )
}
