import { ActiveRoomPage } from '../active-room-page'
import { CreateRoomPage } from '../create-room-page'
import { HomePage } from '../home-page'
import { ProfilePage } from '../profile-page'
import { RoomsPage } from '../rooms-page'
import { AmbientBackground, AppHeader, BottomNavigation, MiniRoomPlayer, RoomAudioPlayer } from '../shared'
import { Hooks } from '../../service'
import type { MusicRoomPage } from '../../types'

export function MusicRoomApp() {
  const app = Hooks.useMusicRoom()
  const hasMainNavigation = app.page === 'home' || app.page === 'rooms' || app.page === 'profile'

  const navigate = (target: MusicRoomPage | 'favorites' | 'create') => {
    if (target === 'create') {
      app.setFormError('')
      app.navigate('create')
    } else if (target === 'favorites') {
      app.navigateToRooms('favorites')
    } else if (target === 'rooms') {
      app.navigateToRooms()
    } else {
      app.setRoomFilter('all')
      app.setActiveGenre('Все')
      app.navigate(target)
    }
  }

  return (
    <AmbientBackground appShellClassName={app.isRoomMinimized ? 'app-shell-with-mini-player' : ''}>
      <RoomAudioPlayer
        track={app.activeTrack}
        isPlaying={app.isPlaying}
        onEnded={app.advanceTrack}
        onPlaybackBlocked={app.handlePlaybackBlocked}
        onPlaybackError={app.handlePlaybackError}
        onAnalyserUpdate={app.handleAnalyserUpdate}
        onPlaybackUpdate={app.handlePlaybackUpdate}
      />
      {hasMainNavigation && (
        <AppHeader
          locale={app.locale}
          t={app.t}
          isHome={app.page === 'home'}
          onNavigateHome={() => navigate('home')}
          onNavigateProfile={() => navigate('profile')}
          onToggleLocale={() => app.setLocale(app.locale === 'ru' ? 'en' : 'ru')}
        />
      )}
      {app.page === 'home' && (
        <HomePage
          rooms={app.visibleRooms}
          locale={app.locale}
          levels={app.visualizerLevels}
          activeGenre={app.activeGenre}
          search={app.search}
          t={app.t}
          onSearchChange={app.setSearch}
          onSubmitSearch={() => {
            app.setRoomFilter('all')
            app.setActiveGenre('Все')
            app.setPage('rooms')
          }}
          onSelectGenre={app.setActiveGenre}
          onOpenRoom={app.openRoom}
          onToggleFavorite={app.toggleFavorite}
          onViewRooms={() => {
            app.setRoomFilter('all')
            app.setActiveGenre('Все')
            app.setPage('rooms')
          }}
        />
      )}
      {app.page === 'rooms' && (
        <RoomsPage
          rooms={app.roomList}
          locale={app.locale}
          filter={app.roomFilter}
          search={app.search}
          t={app.t}
          onFilterChange={app.setRoomFilter}
          onSearchChange={app.setSearch}
          onCreateRoom={() => navigate('create')}
          onOpenRoom={app.openRoom}
          onToggleFavorite={app.toggleFavorite}
        />
      )}
      {app.page === 'profile' && (
        <ProfilePage
          rooms={app.rooms}
          locale={app.locale}
          t={app.t}
          onOpenRoom={app.openRoom}
          onToggleFavorite={app.toggleFavorite}
          onViewCreatedRooms={() => app.navigateToRooms('created')}
        />
      )}
      {app.page === 'create' && (
        <CreateRoomPage
          locale={app.locale}
          t={app.t}
          roomName={app.roomName}
          roomGenre={app.roomGenre}
          isPublic={app.isPublic}
          coverImage={app.coverImage}
          formError={app.formError}
          isInviteOpen={app.isInviteOpen}
          onRoomNameChange={app.setRoomName}
          onRoomGenreChange={app.setRoomGenre}
          onTogglePublic={() => app.setIsPublic(!app.isPublic)}
          onToggleInvite={() => app.setIsInviteOpen(!app.isInviteOpen)}
          onCoverChange={app.handleCoverChange}
          onSubmit={app.createRoom}
          onBack={() => app.navigate('rooms')}
        />
      )}
      {app.page === 'room' && app.activeRoom && (
        <ActiveRoomPage
          room={app.activeRoom}
          locale={app.locale}
          t={app.t}
          trackIndex={app.trackIndex}
          isPlaying={app.isPlaying}
          visualizerLevels={app.visualizerLevels}
          isMinimizing={app.isMinimizingRoom}
          playback={app.playback}
          isQueueOpen={app.isQueueOpen}
          isInviteOpen={app.isInviteOpen}
          message={app.message}
          onTrackChange={app.setTrackIndex}
          onTogglePlayback={() => app.setIsPlaying(!app.isPlaying)}
          onToggleQueue={() => app.setIsQueueOpen(!app.isQueueOpen)}
          onToggleInvite={() => app.setIsInviteOpen(!app.isInviteOpen)}
          onShare={app.shareRoom}
          onMessageChange={app.setMessage}
          onSendMessage={app.addMessage}
          onMinimizeRoom={app.minimizeRoom}
          onMinimizeComplete={app.finishMinimizingRoom}
          onLeaveRoom={app.leaveRoom}
        />
      )}
      {app.isRoomMinimized && app.activeRoom && (
        <MiniRoomPlayer
          room={app.activeRoom}
          track={app.activeTrack ?? app.activeRoom.currentTrack}
          locale={app.locale}
          isPlaying={app.isPlaying}
          t={app.t}
          onOpenRoom={app.restoreRoom}
          onTogglePlayback={() => app.setIsPlaying(!app.isPlaying)}
        />
      )}
      {hasMainNavigation && <BottomNavigation page={app.page} roomFilter={app.roomFilter} t={app.t} onNavigate={navigate} />}
      {app.notice && <div className="toast-position z-20 rounded-2xl border border-white/45 bg-room-toast px-4 py-3.5 text-sm leading-normal toast-shadow animate-toast-enter" role="status">{app.notice}</div>}
    </AmbientBackground>
  )
}
