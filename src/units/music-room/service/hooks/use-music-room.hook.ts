import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

import {
  InitialMusicRooms,
  MockMusicTracks,
  MusicRoomGenres,
  translate,
  translateGenre,
  translateRoomName,
} from '../../lib'
import type { Locale, TranslationKey } from '../../lib'
import type { MusicRoom, MusicRoomFilter, MusicRoomPage } from '../../types'

export const useMusicRoom = () => {
  const { t: i18nTranslate, i18n } = useTranslation()
  const [rooms, setRooms] = useState<MusicRoom[]>(InitialMusicRooms)
  const [page, setPage] = useState<MusicRoomPage>('home')
  const locale: Locale = i18n.resolvedLanguage === 'en' ? 'en' : 'ru'
  const [activeRoomId, setActiveRoomId] = useState('night-jazz')
  const [activeGenre, setActiveGenre] = useState('Все')
  const [roomFilter, setRoomFilter] = useState<MusicRoomFilter>('all')
  const [search, setSearch] = useState('')
  const [roomName, setRoomName] = useState('')
  const [roomGenre, setRoomGenre] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [coverImage, setCoverImage] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [visualizerLevels, setVisualizerLevels] = useState<number[]>([])
  const [isMinimizingRoom, setIsMinimizingRoom] = useState(false)
  const [isRoomMinimized, setIsRoomMinimized] = useState(false)
  const [roomReturnPage, setRoomReturnPage] = useState<MusicRoomPage>('rooms')
  const [trackIndex, setTrackIndex] = useState(0)
  const [isQueueOpen, setIsQueueOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [playback, setPlayback] = useState({ currentTime: 0, duration: 0 })
  const [notice, setNotice] = useState('')
  const [formError, setFormError] = useState('')
  const [isInviteOpen, setIsInviteOpen] = useState(false)

  const t = useCallback((key: TranslationKey) => i18nTranslate(key), [i18nTranslate])
  const setLocale = useCallback((nextLocale: Locale) => {
    void i18n.changeLanguage(nextLocale)
  }, [i18n])
  const activeRoom = rooms.find((room) => room.id === activeRoomId) ?? rooms[0]
  const activeTrack = activeRoom?.queue[trackIndex % activeRoom.queue.length] ?? activeRoom?.currentTrack
  const visibleRooms = rooms.filter((room) => {
    const matchesGenre = activeGenre === 'Все' || room.genre === activeGenre
    const searchableText = `${translateRoomName(locale, room.name)} ${translateGenre(locale, room.genre)}`
    const matchesSearch = searchableText.toLocaleLowerCase(locale).includes(search.trim().toLocaleLowerCase(locale))
    return matchesGenre && matchesSearch
  })
  const roomList = visibleRooms.filter((room) => {
    if (roomFilter === 'created') return room.isMine
    if (roomFilter === 'favorites') return room.isFavorite
    return true
  })

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = t('appTitle')
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('appDescription'))
  }, [locale, t])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  useEffect(() => {
    setPlayback({ currentTime: 0, duration: 0 })
  }, [activeTrack?.audioSrc])

  const handlePlaybackUpdate = useCallback((currentTime: number, duration: number) => {
    setPlayback({ currentTime, duration: Number.isFinite(duration) ? duration : 0 })
  }, [])

  const handlePlaybackBlocked = useCallback(() => {
    setIsPlaying(false)
    setVisualizerLevels([])
    setNotice(t('audioPlayBlocked'))
  }, [t])

  const handlePlaybackError = useCallback(() => {
    setIsPlaying(false)
    setVisualizerLevels([])
    setNotice(t('audioPlaybackError'))
  }, [t])

  const handleAnalyserUpdate = useCallback((levels: number[]) => {
    setVisualizerLevels(levels)
  }, [])

  const advanceTrack = useCallback(() => {
    setTrackIndex((index) => (index + 1) % (activeRoom?.queue.length ?? 1))
  }, [activeRoom?.queue.length])

  const navigate = (target: MusicRoomPage) => {
    setPage(target)
    setSearch('')
  }

  const navigateToRooms = (filter: MusicRoomFilter = 'all') => {
    setRoomFilter(filter)
    setActiveGenre('Все')
    navigate('rooms')
  }

  const openRoom = (roomId: string) => {
    if (page !== 'room') {
      setRoomReturnPage(page === 'create' ? 'rooms' : page)
    }
    setActiveRoomId(roomId)
    setTrackIndex(0)
    setIsPlaying(true)
    setIsRoomMinimized(false)
    setIsQueueOpen(false)
    navigate('room')
  }

  const minimizeRoom = () => {
    setIsMinimizingRoom(true)
  }

  const finishMinimizingRoom = () => {
    setIsMinimizingRoom(false)
    setIsRoomMinimized(true)
    navigate(roomReturnPage)
  }

  const restoreRoom = () => {
    setIsRoomMinimized(false)
    navigate('room')
  }

  const leaveRoom = () => {
    setIsPlaying(false)
    setIsMinimizingRoom(false)
    setIsRoomMinimized(false)
    navigate('rooms')
  }

  const toggleFavorite = (roomId: string) => {
    setRooms((currentRooms) => currentRooms.map((room) =>
      room.id === roomId ? { ...room, isFavorite: !room.isFavorite } : room,
    ))
  }

  const createRoom = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const name = roomName.trim()
    if (!name) {
      setFormError(t('roomNameError'))
      return
    }

    const newRoom: MusicRoom = {
      id: `room-${Date.now()}`,
      name,
      genre: roomGenre || MusicRoomGenres[0],
      listeners: 1,
      isFavorite: false,
      isMine: true,
      isPublic,
      cover: coverImage ? 'cover-custom' : 'cover-focus',
      coverImage: coverImage || undefined,
      currentTrack: { ...MockMusicTracks[0] },
      queue: MockMusicTracks.map((track) => ({ ...track })),
      messages: [{ id: `welcome-${Date.now()}`, author: 'Ты', text: translate(locale, 'welcomeMessage'), color: 'avatar-gold' }],
    }
    setRooms((currentRooms) => [newRoom, ...currentRooms])
    setRoomName('')
    setCoverImage('')
    setFormError('')
    openRoom(newRoom.id)
  }

  const addMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = message.trim()
    if (!text || !activeRoom) return
    setRooms((currentRooms) => currentRooms.map((room) => room.id === activeRoom.id
      ? { ...room, messages: [...room.messages, { id: `message-${Date.now()}`, author: 'Ты', text, color: 'avatar-gold' }] }
      : room))
    setMessage('')
  }

  const shareRoom = async () => {
    if (!activeRoom) return
    const link = `${window.location.origin}/?room=${activeRoom.id}`
    try {
      await window.navigator.clipboard.writeText(link)
      setNotice(t('shareCopied'))
    } catch {
      setNotice(`${t('shareFallback')} ${link}`)
    }
    window.setTimeout(() => setNotice(''), 4000)
  }

  const handleCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setFormError(t('coverTypeError'))
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCoverImage(reader.result)
        setFormError('')
      }
    }
    reader.onerror = () => setFormError(t('coverReadError'))
    reader.readAsDataURL(file)
  }

  return {
    rooms,
    page,
    locale,
    activeRoom,
    activeTrack,
    activeGenre,
    roomFilter,
    search,
    roomName,
    roomGenre,
    isPublic,
    coverImage,
    isPlaying,
    visualizerLevels,
    isMinimizingRoom,
    isRoomMinimized,
    trackIndex,
    isQueueOpen,
    message,
    playback,
    notice,
    formError,
    isInviteOpen,
    visibleRooms,
    roomList,
    t,
    setPage,
    setLocale,
    setActiveGenre,
    setRoomFilter,
    setSearch,
    setRoomName,
    setRoomGenre,
    setIsPublic,
    setIsPlaying,
    setTrackIndex,
    setIsQueueOpen,
    setMessage,
    setFormError,
    setIsInviteOpen,
    navigate,
    navigateToRooms,
    openRoom,
    toggleFavorite,
    createRoom,
    addMessage,
    shareRoom,
    handleCoverChange,
    advanceTrack,
    handlePlaybackBlocked,
    handlePlaybackError,
    handleAnalyserUpdate,
    handlePlaybackUpdate,
    minimizeRoom,
    finishMinimizingRoom,
    restoreRoom,
    leaveRoom,
  }
}
