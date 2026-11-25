import type { PropsWithChildren } from 'react'

const AmbientOrbs = ['ambient-orb-one', 'ambient-orb-two', 'ambient-orb-three', 'ambient-orb-four']

type Props = PropsWithChildren<{
  appShellClassName?: string
}>

export const AmbientBackground = (props: Props) => {
  const { children, appShellClassName = '' } = props

  return (
    <div className="ambient-gradient relative isolate min-h-screen overflow-hidden bg-room-background">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        {AmbientOrbs.map((orb) => (
          <span className={`ambient-orb ${orb}`} key={orb} />
        ))}
      </div>
      <div className={`app-shell ${appShellClassName}`}>{children}</div>
    </div>
  )
}
