import type { ReactNode } from 'react'

export type IconName =
  | 'home'
  | 'search'
  | 'music'
  | 'user'
  | 'heart'
  | 'plus'
  | 'arrow'
  | 'back'
  | 'play'
  | 'pause'
  | 'next'
  | 'queue'
  | 'share'
  | 'send'
  | 'volume'
  | 'users'
  | 'chevronDown'

const Icons: Record<IconName, ReactNode> = {
  home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></>,
  music: <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  heart: <path d="M20.8 8.6c0 4.5-8.8 10.1-8.8 10.1S3.2 13.1 3.2 8.6A4.6 4.6 0 0 1 12 6.4a4.6 4.6 0 0 1 8.8 2.2Z" />,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  arrow: <><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></>,
  back: <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>,
  play: <path d="m8 5 12 7-12 7z" />,
  pause: <><path d="M8 5v14M16 5v14" /></>,
  next: <><path d="m6 5 10 7-10 7zM19 5v14" /></>,
  queue: <><path d="M4 6h16M4 12h16M4 18h10" /><path d="m17 16 3 2-3 2" /></>,
  share: <><path d="M12 16V3m-5 5 5-5 5 5" /><path d="M5 13v7h14v-7" /></>,
  send: <><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></>,
  volume: <><path d="M4 10v4h4l5 4V6l-5 4z" /><path d="M17 9a5 5 0 0 1 0 6M19 5a10 10 0 0 1 0 14" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  chevronDown: <path d="m6 9 6 6 6-6" />,
}

type Props = React.SVGAttributes<SVGSVGElement> & {
  name: IconName
  size?: number
}

export const Icon = (props: Props) => {
  const { name, size = 22, ...restProps } = props
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...restProps}
    >
      {Icons[name]}
    </svg>
  )
}
