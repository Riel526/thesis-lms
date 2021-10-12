import { useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { SubjectPageIcon } from '../../components/Icons/Icons'

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  const userSubjects = await fetch(
    `${process.env.BASE_URL}/api/${session.user.role}s/${session.user._id}`
  )
    .then((res) => res.json())
    .then((json) => json.data)

  return {
    props: {
      userSubjects,
    },
  }
}

const Home = (props) => {
  const [session, loading] = useSession()

  const router = useRouter()

  if (!loading && !session) {
    router.replace('/')
  }

  if(loading) {
    return ''
  }

  return (
    <div className="flex items-center justify-center flex-1 w-full">
      <Head>
        <title>Home</title>
      </Head>

      <div className="grid justify-center w-full h-full grid-cols-3 col-span-8 p-4 bg-WSAI-Indigo-25 ">
        {props.userSubjects.subjects.map((userSubject) => {
          return (
            <div
              className="flex flex-col overflow-hidden shadow bg-WSAI-Indigo-50 rounded-xl w-96 h-96"
              key={userSubject._id}
            >
              <Link href={`subjects/overview/${userSubject._id}`}>
                <a className="relative overflow-hidden rounded-b-sm bg-WSAI-Indigo-50 rounded-t-xl w-96 h-72">
                  <Image
                    src={userSubject.image}
                    alt="subject"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </a>
              </Link>
              <div className="flex flex-col flex-1 p-2">
                <Link href={`subjects/overview/${userSubject._id}`}>
                  <a className="contents">
                    <h1 className="text-xl font-medium text-center text-WSAI-Indigo-500">
                      {userSubject.subjectName}
                    </h1>
                    <button className="self-center p-1 mt-6 transition-colors rounded-full shadow bg-WSAI-Indigo-25 hover:bg-WSAI-Indigo-500 group">
                      <SubjectPageIcon className="w-4 h-4 transition-colors fill-current text-WSAI-Indigo-500 group-hover:text-WSAI-Indigo-25" />
                    </button>
                  </a>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
