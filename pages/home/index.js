import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Head from 'next/head'



const Home = () => {

  const [session, loading] = useSession()

  const router = useRouter()

  if (!loading && !session) {
    router.replace('/')
  }


  return (
    <div className="grid items-center justify-center flex-1 w-full h-screen grid-cols-12">
      <Head>
        <title>Home</title>
      </Head>
      <div className="w-full h-full col-span-2 bg-WSAI-DirtyWhite">

      </div>

      <div className="grid w-full h-full grid-cols-3 col-span-8 bg-WSAI-White">
        {

        }
      </div>

      <div className="w-full h-full col-span-2 bg-WSAI-DirtyWhite">

      </div>
    </div>
  )
}

export default Home
