import type { FormEventHandler } from 'react'

import { formatListeners, translateRoomName, translateTrackTitle } from '../../lib'
import type { Locale, TranslationKey } from '../../lib'
import type { MusicRoom } from '../../types'
import { ChatMessage, Icon, PlayerControls, RoomArtwork, RoomQueue } from '../shared'

const NeutralWaveLevels = Array.from({ length: 28 }, () => 0.5)

const createWavePath = (levels: number[], baseRadius: number, amplitude: number, pulse: number, bandOffset: number) => {
  const waveLevels = levels.length > 0 ? levels : NeutralWaveLevels
  const points = Array.from({ length: waveLevels.length * 4 }, (_, index) => {
    const progress = index / (waveLevels.length * 4)
    const bandPosition = (progress * waveLevels.length + bandOffset) % waveLevels.length
    const bandIndex = Math.floor(bandPosition)
    const nextBandIndex = (bandIndex + 1) % waveLevels.length
    const levelProgress = bandPosition - bandIndex
    const level = waveLevels[bandIndex] + (waveLevels[nextBandIndex] - waveLevels[bandIndex]) * levelProgress
    const angle = progress * Math.PI * 2 - Math.PI / 2
    const radius = baseRadius + pulse * 2 + (level - 0.5) * amplitude

    return {
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius,
    }
  })
  const firstPoint = points[0]
  const lastPoint = points[points.length - 1]
  let path = `M ${(lastPoint.x + firstPoint.x) / 2} ${(lastPoint.y + firstPoint.y) / 2}`

  points.forEach((point, index) => {
    const nextPoint = points[(index + 1) % points.length]
    path += ` Q ${point.x} ${point.y} ${(point.x + nextPoint.x) / 2} ${(point.y + nextPoint.y) / 2}`
  })

  return `${path} Z`
}

type Props = {
  room: MusicRoom
  locale: Locale
  t: (key: TranslationKey) => string
  trackIndex: number
  isPlaying: boolean
  visualizerLevels: number[]
  isMinimizing: boolean
  playback: { currentTime: number; duration: number }
  isQueueOpen: boolean
  isInviteOpen: boolean
  message: string
  onMinimizeRoom: () => void
  onMinimizeComplete: () => void
  onTrackChange: (index: number) => void
  onTogglePlayback: () => void
  onToggleQueue: () => void
  onToggleInvite: () => void
  onShare: () => void
  onMessageChange: (value: string) => void
  onSendMessage: FormEventHandler<HTMLFormElement>
  onLeaveRoom: () => void
}

export const ActiveRoomPage = (props: Props) => {
  const {
    room,
    locale,
    t,
    trackIndex,
    isPlaying,
    visualizerLevels,
    isMinimizing,
    playback,
    isQueueOpen,
    isInviteOpen,
    message,
    onMinimizeRoom,
    onMinimizeComplete,
    onTrackChange,
    onTogglePlayback,
    onToggleQueue,
    onToggleInvite,
    onShare,
    onMessageChange,
    onSendMessage,
    onLeaveRoom,
  } = props
  const currentIndex = trackIndex % room.queue.length
  const activeTrack = room.queue[currentIndex] ?? room.currentTrack
  const progress = playback.duration > 0 ? Math.min((playback.currentTime / playback.duration) * 100, 100) : 0
  const pulseLevel = visualizerLevels[3] ?? 0.5

  return (
    <div
      className={isMinimizing ? 'animate-room-collapse pointer-events-none' : 'animate-room-expand'}
      onAnimationEnd={(event) => {
        if (isMinimizing && event.target === event.currentTarget) onMinimizeComplete()
      }}
    >
      <header className="flex items-center gap-3 pt-1 pb-4">
        <button className="grid size-12 place-items-center rounded-full border border-white/65 bg-white/15" onClick={onLeaveRoom} aria-label={t('leaveRoom')}><Icon name="back" /></button>
        <div className="grid min-w-0 flex-1 gap-1">
          <span className="text-micro font-semibold tracking-widest text-room-text uppercase">{t('roomLabel')}</span>
          <strong className="overflow-hidden text-sm text-ellipsis whitespace-nowrap">{translateRoomName(locale, room.name)}</strong>
        </div>
        <button className="flex items-center gap-1.5 rounded-full border border-white/60 bg-white/15 px-3 py-2.5 text-xs whitespace-nowrap" onClick={onToggleInvite}>
          <span className="flex">
            <i className="size-3 rounded-full border border-room-gray bg-room-avatar-light" />
            <i className="-ml-1 size-3 rounded-full border border-room-gray bg-room-avatar-dark" />
            <i className="-ml-1 size-3 rounded-full border border-room-gray bg-room-gold" />  
          </span>
          {formatListeners(locale, room.listeners)}
        </button>
        <button className="grid size-11 shrink-0 place-items-center rounded-full border border-white/65 bg-white/15" onClick={onMinimizeRoom} aria-label={t('collapseRoom')}><Icon name="chevronDown" size={20} /></button>
      </header>
      <main className="relative z-10 animate-page-enter pb-16">
        {isInviteOpen && (
          <div className="mb-3 flex items-center justify-between rounded-2xl border border-room-gold/50 bg-room-gold/10 px-3.5 py-3 text-meta">
            <span>{t('inviteBanner')}</span>
            <button className="grid size-8 place-items-center rounded-full border-0 bg-room-gold text-room-ink" onClick={onShare} aria-label={t('shareLink')}><Icon name="share" size={19} /></button>
          </div>
        )}
        <div className="text-center">
          <div className="record-stage-size relative mx-auto mt-1 mb-6 aspect-square">
            <div className="relative z-10 grid size-full place-items-center rounded-full border border-white/85">
              <svg
                className={`record-wave-canvas pointer-events-none absolute inset-0 size-full ${isPlaying ? 'record-wave-active' : 'record-wave-paused'}`}
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <path className="record-wave-path record-wave-path-outer" d={createWavePath(visualizerLevels, 46, 5, pulseLevel, 0)} />
                <path className="record-wave-path record-wave-path-inner" d={createWavePath(visualizerLevels, 42, 4, pulseLevel, 0.5)} />
              </svg>
              <RoomArtwork
                cover={room.cover}
                coverImage={room.coverImage}
                className={`record-cover-size rounded-3xl border border-white/85 record-art-shadow ${room.cover === 'cover-jazz' ? 'cover-jazz-record' : ''}`}
                showDetails={false}
              />
            </div>
          </div>
          <p className="mb-2 text-eyebrow font-semibold tracking-widest text-room-text uppercase">{t('nowPlaying')}</p>
          <h1 className="text-track-title leading-tight tracking-tighter font-bold">{translateTrackTitle(locale, activeTrack.title)}</h1>
          <p className="mt-2 mb-4 text-lg text-room-copy">{activeTrack.artist}</p>
          <div className="flex justify-center gap-2">
            <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/75 bg-white/15 px-4 text-meta transition-colors duration-200 hover:border-room-gold" onClick={onShare}><Icon name="share" size={19} />{t('share')}</button>
            <button className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border bg-white/15 px-4 text-meta transition-colors duration-200 hover:border-room-gold ${isQueueOpen ? 'border-room-gold text-room-gold' : 'border-white/75'}`} onClick={onToggleQueue}><Icon name="queue" size={19} />{t('queue')}</button>
          </div>
        </div>
        {isQueueOpen ? (
          <RoomQueue tracks={room.queue} currentIndex={currentIndex} locale={locale} t={t} onSelectTrack={onTrackChange} />
        ) : (
          <section className="mt-5 rounded-3xl border border-white/65 bg-white/25 px-4 py-4" aria-label={t('nowPlaying')}>
            <div className="h-1 overflow-hidden rounded-full bg-white/25"><span className="block h-full rounded-full bg-white transition-all duration-300" style={{ width: `${progress}%` }} /></div>
            <div className="mt-2 flex justify-between text-meta text-gray-300">
              <span>{formatTime(playback.currentTime)}</span>
              <span>{playback.duration > 0 ? formatTime(playback.duration) : activeTrack.duration ?? '--:--'}</span>
            </div>
            <PlayerControls t={t} trackCount={room.queue.length} trackIndex={trackIndex} isPlaying={isPlaying} onTrackChange={onTrackChange} onTogglePlayback={onTogglePlayback} />
          </section>
        )}
        <section className="mt-5 rounded-3xl border border-white/65 bg-white/25 px-4 py-4">
          <div className="mb-4 flex justify-between text-xs font-semibold tracking-widest text-room-text uppercase">
            <span>{t('roomChat')}</span>
            <span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-room-gold" />{t('online')}</span>
          </div>
          <div className="grid max-h-48 gap-3 overflow-auto">
            {room.messages.map((chatMessage) => <ChatMessage key={chatMessage.id} message={chatMessage} locale={locale} />)}
          </div>
          <form className="mt-3.5 flex min-h-12 items-center gap-2 rounded-full bg-white/30 py-1 pr-1 pl-3.5" onSubmit={onSendMessage}>
            <input className="w-full min-w-0 border-0 bg-transparent text-small text-white outline-none placeholder:text-room-placeholder focus-visible:outline-none" value={message} onChange={(event) => onMessageChange(event.currentTarget.value)} placeholder={t('chatPlaceholder')} aria-label={t('chatPlaceholder')} />
            <button className="grid size-10 shrink-0 place-items-center rounded-full border-0 bg-white text-room-ink transition-transform duration-200 active:scale-90" aria-label={t('sendMessage')} type="submit"><Icon name="send" size={20} /></button>
          </form>
        </section>
      </main>
    </div>
  )
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
