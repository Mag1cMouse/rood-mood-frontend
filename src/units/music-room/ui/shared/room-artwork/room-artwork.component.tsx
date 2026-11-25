type Props = {
  cover: string
  coverImage?: string
  className?: string
  showDetails?: boolean
}

export const RoomArtwork = (props: Props) => {
  const { cover, coverImage, className = '', showDetails = true } = props
  const style = coverImage
    ? { backgroundImage: `linear-gradient(180deg, #0001, #0004), url("${coverImage}")` }
    : undefined

  return (
    <div className={`relative grid aspect-square flex-none place-items-center overflow-hidden rounded-3xl room-artwork-gradient bg-cover bg-center ${cover} ${className}`} style={style} aria-hidden="true">
      {showDetails && (
        <>
          <span className="artwork-disc absolute aspect-square rounded-full animate-record-spin" />
          <span className="relative text-5xl font-light text-white/50 animate-spark-drift">♫</span>
        </>
      )}
    </div>
  )
}
