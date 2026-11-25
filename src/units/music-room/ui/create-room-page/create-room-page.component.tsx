import type { ChangeEventHandler, FormEventHandler } from 'react'

import starUrl from '@assets/icons/star.svg?url'
import { MusicRoomGenres, translateGenre } from '../../lib'
import type { Locale, TranslationKey } from '../../lib'
import { GenreChipList, Icon } from '../shared'

type Props = {
  locale: Locale
  t: (key: TranslationKey) => string
  roomName: string
  roomGenre: string
  isPublic: boolean
  coverImage: string
  formError: string
  isInviteOpen: boolean
  onRoomNameChange: (value: string) => void
  onRoomGenreChange: (genre: string) => void
  onTogglePublic: () => void
  onToggleInvite: () => void
  onCoverChange: ChangeEventHandler<HTMLInputElement>
  onSubmit: FormEventHandler<HTMLFormElement>
  onBack: () => void
}

export const CreateRoomPage = (props: Props) => {
  const {
    locale,
    t,
    roomName,
    roomGenre,
    isPublic,
    coverImage,
    formError,
    isInviteOpen,
    onRoomNameChange,
    onRoomGenreChange,
    onTogglePublic,
    onToggleInvite,
    onCoverChange,
    onSubmit,
    onBack,
  } = props

  return (
    <>
      <header className="flex items-center justify-start gap-4 pt-2 pb-8 text-eyebrow font-semibold tracking-widest text-gray-300 uppercase">
        <button className="grid size-10 place-items-center rounded-full border border-white/65 bg-white/15" onClick={onBack} aria-label={t('back')}><Icon name="back" /></button>
      </header>
      <main className="relative z-10 animate-page-enter">
        <h1 className="mb-1 text-create-title leading-none tracking-tighter font-bold">
          {t('newRoom')}
          <span className="relative ml-1 inline-block size-8 align-top">
            <img className="absolute -top-2 left-0 size-6" src={starUrl} alt="" />
            <img className="absolute right-0 -bottom-px size-3 rotate-12" src={starUrl} alt="" />
          </span>
        </h1>
        <p className="mb-0 text-eyebrow font-semibold tracking-widest text-room-text uppercase">{t('setupWave')}</p>
        <form onSubmit={onSubmit}>
          <div className="relative -mx-gutter mt-8 mb-7 grid justify-items-center max-compact:-mx-4">
            <label
              className="relative z-10 m-0 grid size-36 place-items-center overflow-hidden rounded-3xl border border-white/65 bg-white/15 text-center bg-cover bg-center"
              style={coverImage ? { backgroundImage: `linear-gradient(180deg, transparent, #12151b88), url("${coverImage}")` } : undefined}
            >
              <input className="absolute inset-0 size-full cursor-pointer opacity-0" type="file" accept="image/*" onChange={onCoverChange} aria-label={t('uploadCover')} />
              <span className="pointer-events-none relative z-10 grid size-12 place-items-center rounded-full bg-transparent"><Icon name="plus" size={30} /></span>
            </label>
            <span className="mt-3 text-room-small">{coverImage ? t('coverAdded') : t('addCover')}</span>
          </div>
          <input
            id="room-name"
            className="min-h-12 w-full rounded-full border border-white/20 bg-white/20 px-4 text-white placeholder:text-room-placeholder focus:border-room-gold"
            value={roomName}
            onChange={(event) => onRoomNameChange(event.currentTarget.value)}
            placeholder={t('roomNamePlaceholder')}
            aria-label={t('roomName')}
            maxLength={40}
          />
          <div className="select-chevron relative mt-5">
            <select
              id="room-genre"
              className={`min-h-12 w-full appearance-none rounded-full border border-white/20 bg-white/20 px-4 pr-11 focus:border-room-gold ${roomGenre ? 'text-white' : 'text-room-placeholder'}`}
              value={roomGenre}
              aria-label={t('genrePlaceholder')}
              onChange={(event) => onRoomGenreChange(event.currentTarget.value)}
            >
              <option className="bg-neutral-900" value="" disabled>{t('genrePlaceholder')}</option>
              {MusicRoomGenres.map((genre) => <option className="bg-neutral-900" key={genre} value={genre}>{translateGenre(locale, genre)}</option>)}
            </select>
          </div>
          <GenreChipList
            locale={locale}
            genres={MusicRoomGenres.slice(0, 4)}
            selectedGenre={roomGenre || MusicRoomGenres[0]}
            onSelect={onRoomGenreChange}
            className="mt-5 flex-nowrap overflow-x-auto scrollbar-none"
            chipSize="small"
          />
          <button type="button" className="mt-5 flex min-h-16 w-full items-center justify-between rounded-2xl border border-white/65 bg-white/15 px-4 py-2.5 text-left" onClick={onTogglePublic} aria-pressed={isPublic}>
            <strong className="text-sm">{isPublic ? t('publicRoom') : t('privateRoom')}</strong>
            <span className={`flex h-7 w-13 items-center rounded-full p-1 transition-colors duration-200 ${isPublic ? 'justify-end bg-room-gold' : 'bg-neutral-600'}`}><i className="size-6 rounded-full bg-white transition-transform duration-200" /></span>
          </button>
          <button type="button" className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/75 bg-white/15 px-4 text-sm transition-colors duration-200 hover:border-room-gold" onClick={onToggleInvite}>
            <Icon name="users" />{isInviteOpen ? t('friendsInvited') : t('inviteFriends')}
          </button>
          {isInviteOpen && <p className="my-2.5 mx-1 text-meta leading-normal text-gray-300">{t('friendsReady')}</p>}
          {formError && <p className="my-3 mx-1 text-small text-room-danger" role="alert">{formError}</p>}
          <button className="mt-5 flex min-h-14 w-full items-center justify-center gap-3 rounded-full border-0 bg-room-button font-semibold" type="submit">{t('createRoom')} <Icon name="arrow" size={22} /></button>
        </form>
      </main>
    </>
  )
}
