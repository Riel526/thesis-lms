import Image from 'next/image'
import {
  HomeIcon,
  DashboardIcon,
  GroupsIcon,
  LockerIcon,
  GamesIcon,
  NotificationIcon,
  MessagesIcon,
  ChevronDownIcon,
} from '../Icons/Icons'
import NavbarLink from './NavbarLink'
import { useSession } from 'next-auth/client'
import NavbarDropdown from './NavbarDropdown'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Navbar = () => {
  const router = useRouter()

  const [session, loading] = useSession()

  return (
    <nav className="fixed top-0 left-0 z-30 w-full shadow">

      <div className="grid w-full h-16 grid-cols-12 bg-WSAI-Indigo-500 text-WSAI-Indigo-25">

        <div className="flex items-center col-span-2 px-4 gap-x-3">
          <Link href="/home">
            <a>
              <figure className="relative w-10 h-12 cursor-pointer focus:outline-none focus:ring">
                <Image src="/logo.png" alt="wsai logo" layout="fill" />
              </figure>
            </a>
          </Link>
          <div className="flex flex-col text-xs">
            <p className="uppercase">WILL School</p>
            <p>Learning Management System</p>
          </div>
        </div>

        <div className="grid items-center grid-cols-5 col-span-8 gap-x-3">
          <NavbarLink basePath="home" href="/home">
            <HomeIcon className="w-8 h-8 col-span-1 fill-current justify-self-center focus:ring" />
          </NavbarLink>
          <NavbarLink basePath="dashboard" href="/dashboard">
            <DashboardIcon className="w-8 h-8 col-span-1 fill-current justify-self-center" />
          </NavbarLink>
          <NavbarLink basePath="groups" href="/groups">
            <GroupsIcon className="w-8 h-8 col-span-1 fill-current justify-self-center" />
          </NavbarLink>
          <NavbarLink basePath="locker" href="/locker">
            <LockerIcon className="w-8 h-8 col-span-1 fill-current justify-self-center" />
          </NavbarLink>
          <NavbarLink basePath="games" href="/games">
            <GamesIcon className="w-8 h-8 col-span-1 fill-current justify-self-center" />
          </NavbarLink>
        </div>

        <div className="flex items-center justify-end col-span-2 px-4 gap-x-3">
          <div className="flex flex-col text-right">
            <Link href={`/user/${session.user.role}/${session.user._id}`}>
              <a className="text-sm focus:outline-none focus:ring">{session && session.user.name}</a>
            </Link>
            <Link href={`/user/${session.user.role}/${session.user._id}`}>
              <a className="text-xs first-letter:uppercase focus:outline-none focus:ring">
                {session && session.user.role}
              </a>
            </Link>
          </div>
          <Link href={`/user/${session.user.role}/${session.user._id}`}>
          <a className="flex items-center justify-center w-10 overflow-hidden rounded-full shadow bg-WSAI-Indigo-400 focus:outline-none focus:ring">
            <figure className="relative w-10 h-10">
              <Image
                objectFit="cover"
                quality={1}
                src={(session && session.user.image) || '/avatar.png'}
                alt="user"
                layout="fill"
              />
            </figure>
          </a>
          </Link>
          <button className="w-10 p-2 rounded-full bg-WSAI-Indigo-400 focus:outline-none focus:ring">
            <NotificationIcon className="w-6 h-6 stroke-current" />
          </button>
          <button className="w-10 p-2 rounded-full bg-WSAI-Indigo-400 focus:outline-none focus:ring">
            <MessagesIcon className="w-6 h-6 stroke-current" />
          </button>
          <NavbarDropdown>
            <ChevronDownIcon className="w-4 h-4 stroke-current" />
          </NavbarDropdown>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
