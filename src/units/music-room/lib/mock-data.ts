import type { MusicRoom } from '../types/music-room.type'
import type { MusicTrack } from '../types/music-track.type'

export const MusicRoomGenres = ['Джаз', 'Инди', 'Хип-хоп', 'Рок', 'Электроника', 'Лоу-фай', 'Эмбиент']

export const MockMusicTracks: MusicTrack[] = [
  {
    title: 'Планы на это лето',
    artist: 'Сироткин',
    duration: '0:00',
    audioSrc: encodeURI('/mock-music/Sirotkin - Планы на это лето (ruspublic.ru).mp3'),
  },
  {
    title: 'На Киевском Динамо',
    artist: 'Дети Rave',
    duration: '0:00',
    audioSrc: encodeURI('/mock-music/Дети Rave На Киевском Динамо.mp3'),
  },
  {
    title: 'Утро',
    artist: 'Дайте танк (!)',
    duration: '0:00',
    audioSrc: '/mock-music/dajjte-tank-utro.mp3',
  },
  {
    title: 'Иордания',
    artist: 'Hungry Punk',
    duration: '0:00',
    audioSrc: encodeURI('/mock-music/Hungry Punk - Иордания.mp3'),
  },
  {
    title: 'Rat Boy',
    artist: 'Rat Boy',
    duration: '0:00',
    audioSrc: '/mock-music/Rat Boy.mp3',
  },
]

export const InitialMusicRooms: MusicRoom[] = [
  {
    id: 'friends-playlist',
    name: 'Плейлист друзей',
    genre: 'Рок',
    listeners: 7,
    isFavorite: false,
    isMine: false,
    isPublic: true,
    cover: 'cover-wave',
    currentTrack: { ...MockMusicTracks[0] },
    queue: MockMusicTracks.map((track) => ({ ...track })),
    messages: [
      { id: 'playlist-1', author: 'Алина', text: 'Включаем погромче!', color: 'avatar-gold' },
      { id: 'playlist-2', author: 'Макс', text: 'Следующий трек мой', color: 'avatar-blue' },
    ],
  },
  {
    id: 'night-jazz',
    name: 'Ночной джаз',
    genre: 'Джаз',
    listeners: 12,
    isFavorite: false,
    isMine: false,
    isPublic: true,
    cover: 'cover-jazz',
    currentTrack: { title: 'Планы на это лето', artist: 'Сироткин', duration: '3:45' },
    queue: [
      { title: 'Планы на это лето', artist: 'Сироткин' },
      { title: 'Тихий свет', artist: 'Моя Мишель' },
      { title: 'Волна', artist: 'Дайте танк (!)' },
    ],
    messages: [
      { id: 'jazz-1', author: 'Алина', text: 'Можно я добавлю следующий трек?', color: 'avatar-lilac' },
      { id: 'jazz-2', author: 'Макс', text: 'Сироткин всегда пробивал на слёзы', color: 'avatar-gold' },
    ],
  },
  {
    id: 'vinyl',
    name: 'Винил',
    genre: 'Инди',
    listeners: 28,
    isFavorite: true,
    isMine: false,
    isPublic: true,
    cover: 'cover-vinyl',
    currentTrack: { title: 'Space Song', artist: 'Beach House', duration: '5:20' },
    queue: [
      { title: 'Space Song', artist: 'Beach House' },
      { title: 'My Love Mine All Mine', artist: 'Mitski' },
      { title: 'Show Me How', artist: 'Men I Trust' },
    ],
    messages: [
      { id: 'vinyl-1', author: 'Лера', text: 'Обожаю этот альбом', color: 'avatar-gold' },
      { id: 'vinyl-2', author: 'Илья', text: 'Добавил ещё один трек в очередь 🎧', color: 'avatar-blue' },
    ],
  },
  {
    id: 'indie-wave',
    name: 'Инди-волна',
    genre: 'Инди',
    listeners: 19,
    isFavorite: false,
    isMine: false,
    isPublic: true,
    cover: 'cover-wave',
    currentTrack: { title: 'The Less I Know The Better', artist: 'Tame Impala', duration: '3:36' },
    queue: [
      { title: 'The Less I Know The Better', artist: 'Tame Impala' },
      { title: 'Bags', artist: 'Clairo' },
    ],
    messages: [
      { id: 'wave-1', author: 'Саша', text: 'Вот это настроение!', color: 'avatar-blue' },
      { id: 'wave-2', author: 'Маша', text: 'Оставляем на повторе?', color: 'avatar-lilac' },
    ],
  },
  {
    id: 'soft-focus',
    name: 'Тихий фокус',
    genre: 'Лоу-фай',
    listeners: 8,
    isFavorite: false,
    isMine: true,
    isPublic: false,
    cover: 'cover-focus',
    currentTrack: { title: 'Coffee Breath', artist: 'Sofia Mills', duration: '2:58' },
    queue: [
      { title: 'Coffee Breath', artist: 'Sofia Mills' },
      { title: 'Snowfall', artist: 'idealism' },
    ],
    messages: [
      { id: 'focus-1', author: 'Ты', text: 'Заходите, вместе работается легче', color: 'avatar-gold' },
    ],
  },
]