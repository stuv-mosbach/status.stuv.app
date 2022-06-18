//import 'tailwindcss/tailwind.css'
import '../styles.css'
import 'animate.css';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
