import { PortableText } from '@portabletext/react'
import Image from 'next/image'

type TextProps = {
  title: string
  body: any
}

type ImageProps = {
  image: string
  imageAlt: string
}

interface TextAndImageSectionProps extends TextProps, ImageProps {
  bgColor?: 'midnight' | 'white'
}
interface TextSectionProps extends TextProps {
  bgColor?: 'midnight' | 'white'
}

export const TextSection = ({ title, body, bgColor }: TextSectionProps) => {
  return (
    <section className={`textSection ${bgColor ? 'bg-' + bgColor : ''}`}>
      <div className="textSection__content">
        <h2 className="textSection__title">{title}</h2>
        <PortableText value={body} />
      </div>
    </section>
  )
}

export const TextAndImageSection = ({
  title,
  body,
  image,
  imageAlt,
  bgColor,
}: TextAndImageSectionProps) => {
  return (
    <section className="textSection relative lg:min-h-[500px]">
      <div className="container max-w-6xl mx-auto py-8">
        <div className="textSection__content text-white p-4 bg-black/70 rounded-2xl w-6/12">
          <h2 className="textSection__title font-display">{title}</h2>
          <PortableText value={body} />
        </div>
      </div>
      <div className="textSection__image absolute top-0 left-0 h-full w-full -z-10">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover h-full w-full"
        />
      </div>
    </section>
  )
}
