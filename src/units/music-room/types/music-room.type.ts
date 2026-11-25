import type { MusicTrack } from './music-track.type'

export type MusicRoom = {
  id: string
  name: string
  genre: string
  listeners: number
  isFavorite: boolean
  isMine: boolean
  isPublic: boolean
  cover: string
  coverImage?: string
  currentTrack: MusicTrack
  queue: MusicTrack[]
  messages: {
    id: string
    author: string
    text: string
    color: string
  }[]
}
