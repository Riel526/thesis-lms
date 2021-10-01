import Layout from '../components/Layout/Layout'
import '../styles/globals.css'
import Router from 'next/router'
import { Provider } from 'next-auth/client'
import AppState from '../components/context/AppState'
import ProgressBar from '@badrap/bar-of-progress'



const progress = new ProgressBar({
  size: 2,
  color: '#EDEFFF',
  className: 'bar-of-progress z-50',
  delay: 100,
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

function MyApp({ Component, pageProps }) {
  return (
    <AppState>
      <Provider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </AppState>
  )
}

export default MyApp
