import type { Locale, TranslationKey } from '../../lib'
import type { MusicRoom } from '../../types'
import { Icon, RoomList } from '../shared'

type Props = {
  rooms: MusicRoom[]
  locale: Locale
  t: (key: TranslationKey) => string
  onOpenRoom: (roomId: string) => void
  onToggleFavorite: (roomId: string) => void
  onViewCreatedRooms: () => void
}

export const ProfilePage = (props: Props) => {
  const { rooms, locale, t, onOpenRoom, onToggleFavorite, onViewCreatedRooms } = props
  const favoriteRooms = rooms.filter((room) => room.isFavorite)
  const stats = [
    { value: rooms.filter((room) => room.isMine).length, label: t('roomCount') },
    { value: favoriteRooms.length, label: t('favoritesCount') },
    { value: 4, label: t('friendsCount') },
  ]

  return (
    <main className="relative z-10 animate-page-enter">
    <p className="mb-3 text-eyebrow font-semibold tracking-widest text-room-text uppercase">{t('profileEyebrow')}</p>
    <h1 className="mb-6 text-room-title leading-none tracking-tighter font-bold">{t('profileTitle')}</h1>
    <section className="mt-7 flex items-center gap-4 rounded-3xl border border-white/60 bg-white/20 p-5">
      <div className="grid size-16 place-items-center rounded-full bg-room-gold text-2xl font-bold text-room-ink">{locale === 'ru' ? 'Т' : 'Y'}</div>
      <div><h2 className="mb-1 text-lg">{t('yourProfile')}</h2><p className="m-0 text-meta text-room-muted">{t('profileSubtitle')}</p></div>
      </section>
    <div className="mt-4 mb-7 flex justify-around rounded-2xl border border-white/40 bg-white/15 px-2.5 py-4">
      {stats.map((stat) => <div className="grid justify-items-center gap-1" key={stat.label}><strong className="text-xl">{stat.value}</strong><span className="text-xs text-room-copy">{stat.label}</span></div>)}
      </div>
      <section className="mt-7">
      <div className="mb-3.5 flex items-center justify-between text-eyebrow font-semibold tracking-widest text-room-text uppercase">{t('favoriteRooms')}</div>
        <RoomList rooms={favoriteRooms} locale={locale} t={t} onOpenRoom={onOpenRoom} onToggleFavorite={onToggleFavorite} />
      {favoriteRooms.length === 0 && <p className="my-4 text-sm text-room-copy">{t('savedRoomsHint')}</p>}
      </section>
    <button className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/75 bg-white/15 px-4 text-sm transition-colors duration-200 hover:border-room-gold" onClick={onViewCreatedRooms}><Icon name="music" />{t('myRooms')}</button>
    </main>
  )
}
