import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Login.module.css'
import { FacebookIcon, EmailIcon, WebsiteIcon } from './../components/Icons/Icons';
import FloatingLabelInput from './../components/Input/FloatingLabelInput';
import { signIn, useSession } from 'next-auth/client'
import { useState, useContext } from 'react'
import AppContext from '../components/context/AppContext';
import { useRouter } from 'next/router'

export default function Login() {

  const router = useRouter()

  const [loginDetails, setLoginDetails] = useState({
    type: 'student',
    email: '',
    password: '',
  })

  const [session, loading] = useSession()

  const { setModalAttributes } = useContext(AppContext)


  const handleSubmit = async e => {
    e.preventDefault()

    setModalAttributes({
      isOpen: true,
      status: 'loading',
      customMessage: ''
    })

    await signIn('credentials', {
      redirect: false,
      callbackUrl: `${process.env.BASE_URL}/home`,
      type: loginDetails.type,
      email: loginDetails.email,
      password: loginDetails.password,
    }).then(res => {
      if (res.error == 'Invalid Password') {
        setModalAttributes({
          isOpen: true,
          status: 'error',
          customMessage: res.error
        })
      } else if (res.error == 'No User Found!') {
        console.log(res.error)
        setModalAttributes({
          isOpen: true,
          status: 'error',
          customMessage: res.error
        })
      }
    })
  }


  if (!loading && session) {
    router.replace('/home')
  }

  const directTo = (link) => {
    document.location.replace(`//${link}`);
  }

  return (
    <div className={styles.defaultBackground}>
      <Head>
        <title>Login</title>
      </Head>
      <div className="absolute inset-x-0 z-10 w-full h-full bg-black bg-opacity-60" />
      <main className="grid grid-cols-8 w-[72rem] h-[40rem] rounded-xl overflow-hidden z-20 relative shadow-md">
        <div className="relative flex flex-col col-span-5 px-4 py-8 bg-WSAI-Indigo">
          <h1 className="font-light text-center uppercase text-7xl text-WSAI-White">WSAI LMS</h1>
          <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ">
            <figure className="relative w-48 h-64">
              <Image src="/logo.png" layout="fill" alt="wsai logo" />
            </figure>
          </div>
          <div className="absolute flex flex-col bottom-4 text-WSAI-White gap-y-2.5">

            <a className="flex items-center gap-x-4" rel="noopener noreferrer" href="www.facebook.com/WILLSchoolOfAntipolo/" target="_blank" onClick={e => directTo("www.facebook.com/WILLSchoolOfAntipolo/")}>
              <span>
                <FacebookIcon className="fill-current w-9 h-9" />
              </span> WILL School of Antipolo, Inc.</a>




            <a className="flex items-center gap-x-4" href="mailto:education@willschool.edu.ph">
              <span>
                <EmailIcon className="fill-current w-9 h-9" />
              </span>
              education@willschool.edu.ph</a>



            <a className="flex items-center gap-x-4" rel="noopener noreferrer" href="www.willschool.edu.ph" target="_blank" onClick={e => directTo("www.willschool.edu.ph")}>
              <span>
                <WebsiteIcon className="fill-current w-9 h-9" />
              </span>
              www.willschool.edu.ph
            </a>


          </div>
        </div>

        <div className="flex flex-col col-span-3 px-4 py-8 bg-WSAI-White">
          <h1 className="font-light text-center uppercase text-7xl text-WSAI-Indigo">Login</h1>
          <form onSubmit={e => handleSubmit(e)} className="grid px-6 mt-28 gap-y-10 justify-self-center">
            <select value={loginDetails.type} onChange={e => setLoginDetails(prevState => ({
              ...prevState,
              type: e.target.value
            }))} className="w-full p-2 mr-2 font-bold text-center bg-transparent bg-yellow-400 border rounded-lg border-WSAI-DirtyWhite text-WSAI-JetBlack focus:outline-none focus:ring focus:ring-inset" name="select-role" id="select-role">
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
            <FloatingLabelInput name="email" value={loginDetails.email}
              onChange={e => setLoginDetails(prevState => ({
                ...prevState,
                email: e.target.value
              }))}
              className="w-full" id="Email" type="email" />
            <div className="relative">
              <FloatingLabelInput name="password" value={loginDetails.password}
                onChange={e => setLoginDetails(prevState => ({
                  ...prevState,
                  password: e.target.value
                }))}
                className="w-full" id="Password" type="password" />
              <button className="absolute right-0 text-xs font-bold uppercase text-WSAI-Indigo -bottom-6 focus:outline-none focus:ring">Forgot Password?</button>
            </div>
            <button className="w-32 px-4 py-2 mt-20 transition-transform rounded-full shadow justify-self-end bg-WSAI-Indigo text-WSAI-White hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring focus:-translate-y-1 focus:shadow-md">Login</button>
          </form>
        </div>
      </main>

    </div >
  )
}
