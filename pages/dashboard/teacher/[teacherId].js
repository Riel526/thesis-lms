import { useState, useContext } from 'react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import FilledButton from '../../../components/Buttons/FilledButton'
import BorderedButton from '../../../components/Buttons/BorderedButton'
import AppContext from '../../../components/context/AppContext'
import FullCalendar from '../../../components/Calendar/FullCalender'

export async function getServerSideProps(context) {
  const { teacherId } = context.query

  const userInformation = await fetch(
    `${process.env.BASE_URL}/api/teachers/${teacherId}`
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

  const { setModalAttributes, updateData, lockerFiles, uploadFiles } =
    useContext(AppContext)

  const [session, loading] = useSession()

  return (
    <div className="w-full p-6 bg-WSAI-Indigo-25">
      <main className="grid w-full h-full grid-cols-6 grid-rows-2 gap-x-6 gap-y-6">
        <section className="grid col-span-4 row-span-1 p-4 rounded-md bg-WSAI-Indigo-50">
          <h1 className="text-lg font-bold text-center text-WSAI-Indigo-500">
            Todo-List
          </h1>
        </section>
        <section className="w-full h-full col-span-2 col-start-5 row-span-2 p-4 rounded-md bg-WSAI-Indigo-50 ">
          <h1 className="text-lg font-bold text-center text-WSAI-Indigo-500">
            Announcements
          </h1>
        </section>
        <section className="grid col-span-4 row-span-1 p-4 rounded-md bg-WSAI-Indigo-50">
          <FullCalendar />
        </section>
      </main>
    </div>
  )
}

export default UserProfile
