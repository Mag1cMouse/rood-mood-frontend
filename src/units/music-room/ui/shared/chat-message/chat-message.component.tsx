import { translateMockMessage } from '../../../lib'
import type { Locale } from '../../../lib'
import type { MusicRoom } from '../../../types'

type Props = {
  message: MusicRoom['messages'][number]
  locale: Locale
}

export const ChatMessage = (props: Props) => {
  const { message, locale } = props
  const author = message.author === 'Ты' && locale === 'en' ? 'You' : message.author
  const avatarColor = message.color === 'avatar-lilac'
    ? 'bg-room-avatar-lilac'
    : message.color === 'avatar-gold'
      ? 'bg-room-gold'
      : 'bg-room-avatar-blue'

  return (
    <div className="flex items-center gap-2.5 animate-message-enter">
      <span className={`size-8 shrink-0 rounded-full ${avatarColor}`} />
      <p className="m-0 text-small leading-snug text-zinc-300"><strong className="mr-1 text-white">{author}</strong> {translateMockMessage(locale, message.id, message.text)}</p>
    </div>
  )
}
