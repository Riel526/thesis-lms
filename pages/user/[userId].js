import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React from 'react'
import styles from '../../styles/UserProfile.module.css'
import Image from 'next/image'
import Link from 'next/link'
import FilledButton from './../../components/Buttons/FilledButton'

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  let userType = session.user.role

  const { userId } = context.query

  const userInformation = await fetch(
    `${process.env.BASE_URL}/api/${userType}s/get/specific-record/${userId}`
  )
    .then((res) => res.json())
    .then((json) => json.data)

  return {
    props: {
      userInformation,
    },
  }
}

const UserProfile = (props) => {
  const router = useRouter()

  return (
    <div className={` ${styles.BoxBG}`}>
      <div className="flex flex-col col-span-12">
        <div className={styles.coverPhoto}>
          <div className="absolute w-40 h-40 overflow-hidden -translate-x-1/2 border rounded-full top-28 border-WSAI-Indigo-100 left-1/2">
            <figure className="relative w-full h-full">
              <Image
                alt="user"
                objectFit="cover"
                layout="fill"
                src={props.userInformation.image || '/avatar.png'}
              />
            </figure>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pt-10 pb-2 ">
          <h1 className="text-2xl font-medium">
            {props.userInformation.firstName} {props.userInformation.lastName}
          </h1>
        </div>
        <hr className="border border-WSAI-Indigo-200 border-opacity-[15%] max-w-6xl w-full mx-auto mb-2" />
        <div className={`flex items-center justify-between mx-16`}>
          <nav className="flex gap-x-2">
            <Link href={`/user/${props.userInformation._id}?tab=Introduction`}>
              <a
                className={`${
                  router.query.tab == 'Introduction' || router.query.tab == null
                    ? 'border-WSAI-Indigo-500'
                    : 'border-transparent'
                } border-b-2`}
              >
                Introduction
              </a>
            </Link>
            <Link href={`/user/${props.userInformation._id}?tab=Information`}>
              <a
                className={`${
                  router.query.tab == 'Information'
                    ? 'border-WSAI-Indigo-500'
                    : 'border-transparent'
                } border-b-2`}
              >
                Information
              </a>
            </Link>
          </nav>
          <div className="flex items-center gap-x-2">
            <FilledButton
              transition={
                'before:w-0 hover:before:w-full before:h-1 before:bottom-0 before:left-0 before:bg-WSAI-Orange before:absolute before:transition-[width] before:duration-200'
              }
            >
              Send Message
            </FilledButton>
          </div>
        </div>
        <div className="flex-1 h-full p-4 mx-16 my-10 rounded-lg bg-WSAI-Indigo-900 backdrop-blur-sm bg-opacity-10"></div>
      </div>
    </div>
  )
}

export default UserProfile
