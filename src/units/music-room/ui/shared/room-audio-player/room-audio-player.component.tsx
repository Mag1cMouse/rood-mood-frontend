import { useCallback, useEffect, useRef } from 'react'

import type { MusicTrack } from '../../../types'

type Props = {
  track?: MusicTrack
  isPlaying: boolean
  onEnded: () => void
  onPlaybackBlocked: () => void
  onPlaybackError: () => void
  onAnalyserUpdate: (levels: number[]) => void
  onPlaybackUpdate: (currentTime: number, duration: number) => void
}

const VisualizerBarCount = 28

const getFrequencyLevels = (frequencies: Uint8Array) => Array.from({ length: VisualizerBarCount }, (_, index) => {
  const start = Math.floor(index * frequencies.length / VisualizerBarCount)
  const end = Math.max(start + 1, Math.floor((index + 1) * frequencies.length / VisualizerBarCount))
  let peak = 0
  let total = 0

  for (let bin = start; bin < end; bin += 1) {
    peak = Math.max(peak, frequencies[bin])
    total += frequencies[bin]
  }

  const average = total / (end - start)
  return Math.max(0, Math.min(1, (peak * 0.7 + average * 0.3 - 8) / 180))
})

export const RoomAudioPlayer = (props: Props) => {
  const { track, isPlaying, onEnded, onPlaybackBlocked, onPlaybackError, onAnalyserUpdate, onPlaybackUpdate } = props
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  const initializeAnalyser = useCallback((audio: HTMLAudioElement) => {
    if (analyserRef.current || typeof window.AudioContext !== 'function') return

    const context = new window.AudioContext()
    try {
      const analyser = context.createAnalyser()
      analyser.fftSize = 512
      analyser.smoothingTimeConstant = 0.76
      const source = context.createMediaElementSource(audio)
      source.connect(analyser)
      analyser.connect(context.destination)
      audioContextRef.current = context
      analyserRef.current = analyser
      sourceRef.current = source
    } catch (error) {
      void context.close()
      console.error('Unable to initialize the music visualizer.', error)
    }
  }, [])

  const startAnalysis = useCallback(() => {
    const analyser = analyserRef.current
    if (!analyser || animationFrameRef.current !== null) return

    const frequencies = new Uint8Array(analyser.frequencyBinCount)
    let lastUpdate = 0
    const update = (time: number) => {
      if (time - lastUpdate >= 33) {
        analyser.getByteFrequencyData(frequencies)
        onAnalyserUpdate(getFrequencyLevels(frequencies))
        lastUpdate = time
      }
      animationFrameRef.current = window.requestAnimationFrame(update)
    }

    animationFrameRef.current = window.requestAnimationFrame(update)
  }, [onAnalyserUpdate])

  const stopAnalysis = useCallback(() => {
    if (animationFrameRef.current === null) return
    window.cancelAnimationFrame(animationFrameRef.current)
    animationFrameRef.current = null
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    const source = track?.audioSrc

    if (!audio) return
    if (!source) {
      stopAnalysis()
      audio.pause()
      audio.removeAttribute('src')
      if (isPlaying) onPlaybackError()
      return
    }

    if (audio.getAttribute('src') !== source) {
      audio.src = source
      audio.load()
    }

    if (!isPlaying) {
      stopAnalysis()
      audio.pause()
      return
    }

    let isCurrent = true
    initializeAnalyser(audio)
    const startPlayback = async () => {
      if (audioContextRef.current?.state === 'suspended') {
        await audioContextRef.current.resume()
      }
      await audio.play()
    }

    void startPlayback().catch((error: unknown) => {
      if (!isCurrent) return
      stopAnalysis()
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        onPlaybackBlocked()
      } else {
        onPlaybackError()
      }
    })

    return () => {
      isCurrent = false
    }
  }, [track?.audioSrc, isPlaying, initializeAnalyser, onPlaybackBlocked, onPlaybackError, stopAnalysis])

  useEffect(() => () => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current)
    }
    sourceRef.current?.disconnect()
    analyserRef.current?.disconnect()
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      void audioContextRef.current.close()
    }
  }, [])

  return (
    <audio
      ref={audioRef}
      preload="none"
      tabIndex={-1}
      aria-hidden="true"
      onEnded={() => { stopAnalysis(); onEnded() }}
      onError={() => { stopAnalysis(); onPlaybackError() }}
      onPlay={startAnalysis}
      onPause={stopAnalysis}
      onTimeUpdate={(event) => onPlaybackUpdate(event.currentTarget.currentTime, event.currentTarget.duration)}
      onLoadedMetadata={(event) => onPlaybackUpdate(event.currentTarget.currentTime, event.currentTarget.duration)}
    />
  )
}
