import Image from 'next/image'

interface HeroProps {
  title: string
  subtitle: string
  image: string
  imageAlt: string
}

export const Hero = ({ title, subtitle, image, imageAlt }: HeroProps) => {
  return (
    <section className="hero relative max-h-[480px] min-h-[480px] h-full w-full">
      <div className="hero__content">
        <h1 className="hero__title">{title}</h1>
        <p className="hero__subtitle">{subtitle}</p>
      </div>
      <div className="hero__image max-h-[480px] h-full w-full absolute top-0 left-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            height: '100%',
          }}
        />
      </div>
    </section>
  )
}
