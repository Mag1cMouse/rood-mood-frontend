import type { Locale, TranslationKey } from '../../lib'
import type { MusicRoom, MusicRoomFilter } from '../../types'
import { Icon, RoomList } from '../shared'

type Props = {
  rooms: MusicRoom[]
  locale: Locale
  filter: MusicRoomFilter
  search: string
  t: (key: TranslationKey) => string
  onFilterChange: (filter: MusicRoomFilter) => void
  onSearchChange: (search: string) => void
  onCreateRoom: () => void
  onOpenRoom: (roomId: string) => void
  onToggleFavorite: (roomId: string) => void
}

const RoomFilters = [
  { value: 'all', label: 'filterAll' },
  { value: 'created', label: 'filterCreated' },
  { value: 'favorites', label: 'filterFavorites' },
] as const satisfies { value: MusicRoomFilter; label: TranslationKey }[]

export const RoomsPage = (props: Props) => {
  const { rooms, locale, filter, search, t, onFilterChange, onSearchChange, onCreateRoom, onOpenRoom, onToggleFavorite } = props

  return (
    <>
      <main className="relative z-10 animate-page-enter">
        <p className="mb-3 text-eyebrow font-semibold tracking-widest text-room-text uppercase">{t('roomsEyebrow')}</p>
        <h1 className="mb-6 text-room-title leading-none tracking-tighter font-bold">{t('roomsTitle')}</h1>
        <label className="flex min-h-12 items-center gap-3 rounded-full border border-white/15 bg-white/20 px-4 text-gray-200 transition focus-within:border-room-gold focus-within:ring-4 focus-within:ring-room-gold/10">
          <Icon name="search" size={21} />
          <input className="w-full min-w-0 border-0 bg-transparent text-white outline-none placeholder:text-room-placeholder focus-visible:outline-none" value={search} onChange={(event) => onSearchChange(event.currentTarget.value)} placeholder={t('searchRooms')} aria-label={t('searchRooms')} />
        </label>
        <div className="-mx-gutter mt-5 mb-6 flex gap-2 overflow-x-auto px-gutter pb-1 scrollbar-none tablet:-mx-7 tablet:px-7 max-compact:-mx-4 max-compact:px-4" role="tablist" aria-label={t('roomsTitle')}>
          {RoomFilters.map((item) => (
            <button
              key={item.value}
              role="tab"
              aria-selected={filter === item.value}
              className={`min-h-11 shrink-0 rounded-full border px-5 text-sm whitespace-nowrap transition-colors duration-200 hover:border-room-gold ${filter === item.value ? 'border-room-black bg-room-black text-white' : 'border-white/60 bg-white/15'}`}
              onClick={() => onFilterChange(item.value)}
            >
              {t(item.label)}
            </button>
          ))}
        </div>
        {rooms.length > 0 ? (
          <RoomList
            rooms={rooms}
            locale={locale}
            t={t}
            onOpenRoom={onOpenRoom}
            onToggleFavorite={onToggleFavorite}
            large
          />
        ) : (
          <div className="mt-7 grid min-h-36 content-center justify-items-center rounded-4xl border border-white/65 bg-white/20 p-3 text-center">
            <span className="text-4xl leading-none text-room-gold">〰</span>
            <h2 className="my-2.5 text-2xl tracking-tight">{t('quiet')}</h2>
            <p className="m-0 max-w-64 leading-snug text-gray-300">{filter === 'favorites' ? t('emptyFavorites') : t('emptyRooms')}</p>
          </div>
        )}
      </main>
      <button className={`create-room-cta-width mx-auto mt-5 flex min-h-14 items-center justify-center gap-3 rounded-full border-0 bg-room-button font-semibold ${rooms.length > 0 ? 'fixed z-10 safe-create-room-position left-1/2 m-0 -translate-x-1/2' : ''}`} onClick={onCreateRoom}>
        <Icon name="plus" size={18} />
        {t('createRoom')}
      </button>
    </>
  )
}
