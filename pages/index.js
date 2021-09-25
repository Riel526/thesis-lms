import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Login.module.css'
import {
  FacebookIcon,
  EmailIcon,
  WebsiteIcon,
} from './../components/Icons/Icons'
import FloatingLabelInput from './../components/Input/FloatingLabelInput'
import { signIn, useSession } from 'next-auth/client'
import { useState, useContext } from 'react'
import AppContext from '../components/context/AppContext'
import { useRouter } from 'next/router'
import LoadingOverlay from './../components/Loading/LoadingOverlay'

export default function Login() {
  const router = useRouter()

  const [loginDetails, setLoginDetails] = useState({
    type: 'student',
    email: '',
    password: '',
  })

  const [session, loading] = useSession()

  const { setModalAttributes } = useContext(AppContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setModalAttributes({
      isOpen: true,
      status: 'loading',
      customMessage: '',
    })

    await signIn('credentials', {
      redirect: false,
      callbackUrl: `${process.env.BASE_URL}/home`,
      type: loginDetails.type,
      email: loginDetails.email,
      password: loginDetails.password,
    }).then((res) => {
      if (res.error == 'Invalid Password') {
        setModalAttributes({
          isOpen: true,
          status: 'error',
          customMessage: res.error,
        })
      } else if (res.error == 'No User Found!') {
        console.log(res.error)
        setModalAttributes({
          isOpen: true,
          status: 'error',
          customMessage: res.error,
        })
      } else {
        setModalAttributes({
          isOpen: false,
          status: '',
          customMessage: '',
        })
      }
    })
  }

  const directTo = (link) => {
    document.location.replace(`//${link}`)
  }

  if (!loading && session) {
    router.replace('/home')
  }

  return (
    <div className={styles.defaultBackground}>
      <Head>
        <title>Login</title>
      </Head>
      <div className="absolute inset-x-0 z-10 w-full h-full bg-black bg-opacity-60" />
      <main className="grid grid-cols-8 md:w-[44rem] lg:w-[60rem] xl:w-[72rem] xl:h-[40rem] rounded-xl overflow-hidden z-20 relative shadow-md">
        <div className="relative flex-col hidden col-span-5 px-4 py-8 lg:flex bg-WSAI-Indigo-500">
          <h1 className="font-light text-center uppercase lg:text-7xl text-WSAI-Indigo-25">
            WSAI LMS
          </h1>
          <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ">
            <figure className="relative w-48 h-64">
              <Image src="/logo.png" layout="fill" alt="wsai logo" />
            </figure>
          </div>
          <div className="absolute flex flex-col bottom-4 text-WSAI-Indigo-25 gap-y-2.5">
            <a
              className="flex items-center gap-x-4"
              rel="noopener noreferrer"
              href="www.facebook.com/WILLSchoolOfAntipolo/"
              target="_blank"
              onClick={(e) =>
                directTo('www.facebook.com/WILLSchoolOfAntipolo/')
              }
            >
              <span>
                <FacebookIcon className="w-8 h-8 fill-current" />
              </span>
              WILL School of Antipolo, Inc.
            </a>

            <a
              className="flex items-center gap-x-4"
              href="mailto:education@willschool.edu.ph"
            >
              <span>
                <EmailIcon className="w-8 h-8 fill-current" />
              </span>
              education@willschool.edu.ph
            </a>

            <a
              className="flex items-center gap-x-4"
              rel="noopener noreferrer"
              href="www.willschool.edu.ph"
              target="_blank"
              onClick={(e) => directTo('www.willschool.edu.ph')}
            >
              <span>
                <WebsiteIcon className="w-8 h-8 fill-current" />
              </span>
              www.willschool.edu.ph
            </a>
          </div>
        </div>

        <div className="flex flex-col px-4 py-8 col-span-full lg:col-span-3 backdrop-blur-sm bg-opacity-90 lg:bg-opacity-100 lg:backdrop-blur-none bg-WSAI-Indigo-25">
          <h1 className="text-6xl font-light text-center uppercase lg:text-7xl text-WSAI-Indigo-500">
            Login
          </h1>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="grid px-6 mt-16 lg:mt-28 gap-y-10 justify-self-center"
          >
            <FloatingLabelInput
              name="email"
              value={loginDetails.email}
              onChange={(e) =>
                setLoginDetails((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
              className="w-full"
              id="Email"
              type="email"
            />
            <div className="relative">
              <FloatingLabelInput
                name="password"
                value={loginDetails.password}
                onChange={(e) =>
                  setLoginDetails((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }))
                }
                className="w-full"
                id="Password"
                type="password"
              />
              <button className="absolute right-0 text-xs font-bold uppercase text-WSAI-Indigo-500 -bottom-6 focus:outline-none focus:ring">
                Forgot Password?
              </button>
            </div>
            <div className="flex flex-col items-end mt-4 gap-y-2">
              <div className="flex items-center gap-x-2">
                <input
                  type="radio"
                  name="type"
                  id="teacher"
                  className={`w-3 relative h-3 rounded-full appearance-none border border-WSAI-Indigo-500 flex items-center justify-center ${
                    loginDetails.type == 'teacher' &&
                    'before:rounded-full before:w-1.5 before:h-1.5 before:bg-WSAI-Indigo-500'
                  }`}
                  onClick={(e) =>
                    setLoginDetails((prevState) => ({
                      ...prevState,
                      type: 'teacher',
                    }))
                  }
                />
                <label className="text-sm text-WSAI-Indigo-500" htmlFor="teacher" value="teacher">
                  Teacher
                </label>
              </div>
              <div className="flex items-center gap-x-2">
                <input
                  type="radio"
                  name="type"
                  id="student"
                  className={`w-3 relative h-3 rounded-full appearance-none border border-WSAI-Indigo-500 flex items-center justify-center ${
                    loginDetails.type == 'student' &&
                    'before:rounded-full before:w-1.5 before:h-1.5 before:bg-WSAI-Indigo-500'
                  }`}
                  onClick={(e) =>
                    setLoginDetails((prevState) => ({
                      ...prevState,
                      type: 'student',
                    }))
                  }
                />
                <label className="text-sm text-WSAI-Indigo-500" htmlFor="seacher" value="student">
                  Student
                </label>
              </div>
            </div>
            <button className="w-32 px-4 py-2 mt-20 transition-transform rounded-full shadow justify-self-end bg-WSAI-Indigo-500 text-WSAI-Indigo-25 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring focus:-translate-y-1 focus:shadow-md">
              Login
            </button>
          </form>

          <div className="lg:hidden absolute flex flex-col bottom-4 text-WSAI-Indigo-500 gap-y-2.5 px-6">
            <a
              className="flex items-center text-sm gap-x-4"
              rel="noopener noreferrer"
              href="www.facebook.com/WILLSchoolOfAntipolo/"
              target="_blank"
              onClick={(e) =>
                directTo('www.facebook.com/WILLSchoolOfAntipolo/')
              }
            >
              <span>
                <FacebookIcon className="w-8 h-8 fill-current" />
              </span>{' '}
              WILL School of Antipolo, Inc.
            </a>

            <a
              className="flex items-center text-sm gap-x-4"
              href="mailto:education@willschool.edu.ph"
            >
              <span>
                <EmailIcon className="w-8 h-8 fill-current" />
              </span>
              education@willschool.edu.ph
            </a>

            <a
              className="flex items-center text-sm gap-x-4"
              rel="noopener noreferrer"
              href="www.willschool.edu.ph"
              target="_blank"
              onClick={(e) => directTo('www.willschool.edu.ph')}
            >
              <span>
                <WebsiteIcon className="w-8 h-8 fill-current" />
              </span>
              www.willschool.edu.ph
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
