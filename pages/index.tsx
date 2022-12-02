import { GetStaticProps } from 'next'
import { Hero } from '../components/organisms/hero'
import { PortableText } from '@portabletext/react'
import {
  TextAndImageSection,
  TextSection,
} from '../components/organisms/textSections'
import { createClient } from 'next-sanity'
import Head from 'next/head'
import Image from 'next/image'

export default function Home(props: any) {
  return (
    <div>
      <Head>
        <title>Amanda Emery | Guide &amp; Teacher</title>
        <meta
          name="description"
          content="Amanda Emery is a guide and teacher helping people discover their most true self."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {props.data.map((item: any) => {
          switch (item._type) {
            case 'hero':
              return <Hero key={item._key} {...item} />
            case 'textSection':
              return <TextSection key={item._key} {...item} />
            case 'textAndImageSection':
              return <TextAndImageSection key={item._key} {...item} />
            default:
              return null
          }
        })}
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2022-11-23',
    useCdn: false,
  })

  const query = `*[
    _type == "page" && !(_id in path("drafts.**")) && slug.current == $setSlug
  ] {
    _id,
    _type,
    "slug": slug.current,
    "pageBuilder": pageBuilder[]{
      _type == "hero" => {
        ...,
        "image": image.asset->url,
        "imageAlt": image.alt
      },
      _type == "textSection" => {
        ...,
        title,
        body
      },
      _type == "textAndImageSection" => {
        ...,
        title,
        body,
        "image": image.asset->url,
        "imageAlt": image.alt
      },
    }
  } | order(_id asc)`
  const params = { setSlug: 'index' }

  const data = await client.fetch(query, params)

  return {
    props: {
      data: data[0].pageBuilder,
    },
  }
}
