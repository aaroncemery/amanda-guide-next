import { GetStaticProps } from 'next'
import { PortableText } from '@portabletext/react'
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
          console.log(item._type, 'item')
          switch (item._type) {
            case 'hero':
              return (
                <section
                  key={item._key}
                  className="hero relative max-h-[480px] min-h-[480px] h-full w-full"
                >
                  <div className="hero__content">
                    <h1 className="hero__title">{item.title}</h1>
                    <p className="hero__subtitle">{item.subtitle}</p>
                  </div>
                  <div className="hero__image max-h-[480px] h-full w-full absolute top-0 left-0">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        height: '100%',
                      }}
                    />
                  </div>
                </section>
              )
            case 'textSection':
              return (
                <section key={item._key} className="textSection">
                  <div className="textSection__content">
                    <h2 className="textSection__title">{item.title}</h2>
                    <PortableText value={item.body} />
                  </div>
                </section>
              )
            case 'textAndImageSection':
              return (
                <section key={item._key} className="textSection">
                  <div className="textSection__content">
                    <h2 className="textSection__title">{item.title}</h2>
                    <PortableText value={item.body} />
                  </div>
                  <div className="textSection__image">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      width={250}
                      height={250}
                    />
                  </div>
                </section>
              )
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
  console.log(data, 'data')

  return {
    props: {
      data: data[0].pageBuilder,
    },
  }
}
