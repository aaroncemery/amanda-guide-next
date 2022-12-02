import '../styles/globals.css'
import '@fontsource/cinzel'
import '@fontsource/dm-serif-display'
import '@fontsource/inter/variable-full.css'
import Layout from '../components/layouts/layout'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
