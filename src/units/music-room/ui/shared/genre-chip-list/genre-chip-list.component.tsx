import { translateGenre } from '../../../lib'
import type { Locale } from '../../../lib'
import { MusicRoomGenres } from '../../../lib'

type Props = {
  locale: Locale
  genres: string[]
  selectedGenre: string
  onSelect: (genre: string) => void
  className?: string
  chipSize?: 'default' | 'small'
}

export const GenreChipList = (props: Props) => {
  const { locale, genres, selectedGenre, onSelect, className = '', chipSize = 'default' } = props

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {genres.map((genre) => (
        <button
          key={genre}
          className={`min-h-10 rounded-full border px-4 text-room-small whitespace-nowrap transition-colors duration-200 hover:border-room-gold ${chipSize === 'small' ? 'min-h-10 px-3 text-xs' : ''} ${selectedGenre === genre ? 'border-room-black bg-room-black text-white' : 'border-white/60 bg-white/15'}`}
          onClick={() => onSelect(genre)}
        >
          {translateGenre(locale, genre)}
        </button>
      ))}
    </div>
  )
}

export const AllMusicRoomGenres = ['Все', ...MusicRoomGenres]
