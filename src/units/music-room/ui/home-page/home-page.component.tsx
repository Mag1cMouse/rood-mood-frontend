import { SharedUi } from '@shared'
import type { Locale, TranslationKey } from '../../lib'
import type { MusicRoom } from '../../types'
import { AllMusicRoomGenres, FeaturedRoomList, GenreChipList, Icon, MusicVisualizer, RoomList } from '../shared'

type Props = {
  rooms: MusicRoom[]
  locale: Locale
  levels: number[]
  activeGenre: string
  search: string
  t: (key: TranslationKey) => string
  onSearchChange: (search: string) => void
  onSubmitSearch: () => void
  onSelectGenre: (genre: string) => void
  onOpenRoom: (roomId: string) => void
  onToggleFavorite: (roomId: string) => void
  onViewRooms: () => void
}

export const HomePage = (props: Props) => {
  const { rooms, locale, levels, activeGenre, search, t, onSearchChange, onSubmitSearch, onSelectGenre, onOpenRoom, onToggleFavorite, onViewRooms } = props
  const featuredRooms = rooms.slice(0, 3)
  const recommendedRooms = rooms.slice(0, 3)

  return (
    <main className="relative z-10 animate-page-enter">
    <p className="mb-3 text-eyebrow font-semibold tracking-widest text-room-text uppercase">{t('homeEyebrow')}</p>
    <h1 className="m-0 text-home-title leading-none tracking-tighter font-bold">
        {t('homeTitle')}<br />
      <span className="inline-flex items-start gap-2">{t('homeTitleSecond')}<SharedUi.Icon className="mt-px h-7 w-4" name="ding" /></span>
      </h1>

    <form className="mt-6 flex min-h-14 items-center gap-3 rounded-full border border-white/15 bg-white/20 px-4 text-gray-200 transition focus-within:border-room-gold focus-within:ring-4 focus-within:ring-room-gold/10" role="search" onSubmit={(event) => { event.preventDefault(); onSubmitSearch() }}>
        <Icon name="search" size={21} />
        <input
          className="w-full min-w-0 border-0 bg-transparent text-white outline-none placeholder:text-room-placeholder focus-visible:outline-none"
          value={search}
          onChange={(event) => onSearchChange(event.currentTarget.value)}
          placeholder={t('searchDiscovery')}
          aria-label={t('searchDiscovery')}
        />
      </form>
      <MusicVisualizer className="mt-3.5 mb-1" levels={levels} label={t('musicVisualizer')} />

      <section className="mt-7 animate-section-enter animation-delay-80">
        <div className="mb-3.5 flex items-center justify-between text-eyebrow font-semibold tracking-widest text-room-text uppercase">
          <span><span className="mr-2 text-2xl leading-none text-room-gold">〰</span>{t('liveNow')}</span>
        </div>
        <FeaturedRoomList
          rooms={featuredRooms}
          locale={locale}
          yoursLabel={t('yours')}
          addFavoriteLabel={t('addFavorite')}
          removeFavoriteLabel={t('removeFavorite')}
          onOpenRoom={onOpenRoom}
          onToggleFavorite={onToggleFavorite}
        />
      </section>

      <section className="mt-7 animate-section-enter animation-delay-160">
        <div className="mb-3.5 flex items-center justify-between text-eyebrow font-semibold tracking-widest text-room-text uppercase">{t('popularGenres')}</div>
        <GenreChipList
          locale={locale}
          genres={AllMusicRoomGenres}
          selectedGenre={activeGenre}
          onSelect={(genre) => onSelectGenre(genre === activeGenre ? 'Все' : genre)}
        />
      </section>

      <section className="mt-7 animate-section-enter animation-delay-250">
        <div className="mb-3.5 flex items-center justify-between text-eyebrow font-semibold tracking-widest text-room-text uppercase">
          {t('roomsForYou')}
          <button className="inline-flex items-center gap-1 border-0 bg-transparent p-0 text-xs font-normal tracking-normal text-gray-300 normal-case" onClick={onViewRooms}>
            {t('allRooms')} <Icon name="arrow" size={15} />
          </button>
        </div>
        <RoomList
          rooms={recommendedRooms}
          locale={locale}
          t={t}
          onOpenRoom={onOpenRoom}
          onToggleFavorite={onToggleFavorite}
          compact
        />
        {recommendedRooms.length === 0 && <p className="my-4 text-sm text-room-copy">{t('noSearchResults')}</p>}
      </section>
    </main>
  )
}
