import { useState, useContext } from 'react'
import { useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import FilledButton from '../../../../components/Buttons/FilledButton'
import BorderedButton from '../../../../components/Buttons/BorderedButton'
import AppContext from '../../../../components/context/AppContext'
import { AddIcon } from '../../../../components/Icons/Icons'

export async function getServerSideProps(context) {
  const { teacherId } = context.query
  const session = await getSession({ req: context.req })

  if (teacherId != session.user._id) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

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

  const { setModalAttributes, updateData } = useContext(AppContext)

  const [session, loading] = useSession()

  return (
    <div className="flex flex-col w-full bg-WSAI-Indigo-25 text-WSAI-JetBlack">
      <main className="flex flex-col grid-cols-1 border-r border-WSAI-Indigo-100">
        <header className="flex items-center justify-between w-full h-[5.5rem] px-4 border-b border-WSAI-Indigo-100">
          <h1 className="text-3xl text-WSAI-Indigo-500">Message</h1>
          <Link href={`/${router.asPath}/new-message`}>
            <a className="flex items-center justify-center rounded-full w-7 h-7 bg-WSAI-Indigo-500 justify-self-end">
              <AddIcon className="fill-current w-7 h-7 text-WSAI-Indigo-25" />
            </a>
          </Link>
        </header>
        <Link href="/">
          <a className="flex items-center w-full h-32 p-2 overflow-hidden bg-indigo-200 border-b border-collapse border-WSAI-Indigo-50 gap-x-2">
            <figure>
              <div className="w-20 h-20 rounded-full bg-WSAI-Indigo-700"></div>
            </figure>
            <div className="flex flex-col justify-center">
              <h1 className="text-sm font-bold capitalize">
                This is a very very long name
              </h1>
              <p className="line-clamp-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
                rem commodi et soluta explicabo consectetur quibusdam corporis
                cupiditate distinctio esse eius doloribus repellendus quia
                debitis exercitationem autem minus hic nihil suscipit non minima
                laborum aliquid modi nemo. Architecto, quia. Aspernatur animi
                magnam quod asperiores quam voluptatibus harum enim sit optio
                ipsam iure ipsa ad nesciunt distinctio doloremque eaque nisi,
                sapiente laudantium tempore. Fugit repellendus nam nesciunt
                repudiandae iste reiciendis quis doloribus illum reprehenderit
                commodi alias eveniet possimus architecto omnis eum dolorum
                facere similique, beatae impedit quaerat sit, nostrum odit?
                Dignissimos, animi. Praesentium voluptatibus, error quam illo
                ipsam fugit maxime corrupti cupiditate culpa dolore qui
                voluptatum et. Aut ex, provident quae iste saepe tempora
                sapiente nesciunt omnis nemo pariatur animi esse mollitia vel?
                Tempore iure reprehenderit mollitia voluptas! Omnis ex numquam
                dolorem neque cumque, porro asperiores molestias consectetur, id
                quod nisi dolore repellat! Quod doloremque quisquam similique.
                Animi magnam repellendus culpa doloribus id nobis optio at
                beatae dolorum deserunt, dolore esse nesciunt porro est unde
                quaerat, blanditiis iure dolores tempora doloremque cupiditate
                explicabo sint. Vel facere nam commodi reiciendis porro.
                Delectus nesciunt explicabo repellat vel odio molestiae
                voluptatibus libero ullam, a recusandae quod eligendi! Beatae
                qui nesciunt atque earum culpa nulla?
              </p>
            </div>
          </a>
        </Link>
      </main>

      {/* <main className="grid grid-cols-3">
        <header className="flex  col-span-3 items-center justify-center w-full h-[5.5rem] px-4 border-b border-WSAI-Indigo-100">
          <h1 className="text-3xl text-WSAI-Indigo-500">New Message</h1>
        </header>
      </main> */}
    </div>
  )
}

export default UserProfile
