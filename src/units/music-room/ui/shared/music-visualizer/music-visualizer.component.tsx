type Props = {
  levels?: number[]
  label: string
  className?: string
}

const Bars = [
  { height: 7 }, { height: 27 }, { height: 13 }, { height: 34, accent: true },
  { height: 17 }, { height: 31 }, { height: 11 }, { height: 24 },
  { height: 39, accent: true }, { height: 15 }, { height: 29 }, { height: 20 },
  { height: 36 }, { height: 10 }, { height: 26 }, { height: 40, accent: true },
  { height: 14 }, { height: 33 }, { height: 19 }, { height: 28 },
  { height: 12 }, { height: 37, accent: true }, { height: 16 }, { height: 30 },
  { height: 8 }, { height: 24 }, { height: 35, accent: true }, { height: 18 },
]

export const MusicVisualizer = (props: Props) => {
  const { levels = [], label, className = '' } = props

  return (
    <div className={`flex h-11 items-center justify-between gap-0 overflow-hidden ${className}`} role="img" aria-label={label}>
      {Bars.map((bar, index) => {
        const level = levels[index]
        const height = level !== undefined
          ? Math.round(bar.height * (0.25 + level * 0.75))
          : bar.height

        return (
          <span
            key={index}
            className={`visualizer-bar block origin-center rounded-none ${bar.accent ? 'bg-room-gold' : 'bg-gray-50'}`}
            style={{ height: `${height}px` }}
          />
        )
      })}
    </div>
  )
}
