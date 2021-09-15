import Layout from '../components/Layout/Layout'
import '../styles/globals.css'
import Router from 'next/router'
import { Provider } from 'next-auth/client'
import AppState from '../components/context/AppState'


// Router.events.on('routeChangeStart', progress.start)
// Router.events.on('routeChangeComplete', progress.finish)
// Router.events.on('routeChangeError', progress.finish)



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
