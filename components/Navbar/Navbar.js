import Image from 'next/image'
import { HomeIcon, DashboardIcon, GroupsIcon, LockerIcon, GamesIcon, NotificationIcon, MessagesIcon, ChevronDownIcon } from '../Icons/Icons'
import NavbarLink from './NavbarLink';
import { useSession } from 'next-auth/client'
import NavbarDropdown from './NavbarDropdown';
import { useRouter } from 'next/router';

const Navbar = () => {

  const router = useRouter()

  const [session, loading] = useSession()

  return (
    <nav className="fixed top-0 left-0 z-30 w-full">
      <div className="grid w-full h-16 grid-cols-12 bg-WSAI-Indigo text-WSAI-White">

        <div className="flex items-center col-span-2 px-4 gap-x-3">
          <figure onClick={() => router.push('/home')} className="relative w-10 h-12 cursor-pointer">
            <Image src="/logo.png" alt="wsai logo" layout="fill" />
          </figure>
          <div className="flex flex-col text-xs">
            <p className="uppercase">WILL School</p>
            <p>Learning Management System</p>
          </div>
        </div>

        <div className="grid items-center grid-cols-5 col-span-8 gap-x-3">
          <NavbarLink basePath='home' href='/home'>
            <HomeIcon className="w-8 h-8 col-span-1 fill-current justify-self-center focus:ring" />
          </NavbarLink>
          <NavbarLink basePath='dashboard' href='/dashboard'>
            <DashboardIcon className="w-8 h-8 col-span-1 fill-current justify-self-center" />
          </NavbarLink>
          <NavbarLink basePath='groups' href='/groups'>
            <GroupsIcon className="w-8 h-8 col-span-1 fill-current justify-self-center" />
          </NavbarLink>
          <NavbarLink basePath='locker' href='/locker'>
            <LockerIcon className="w-8 h-8 col-span-1 fill-current justify-self-center" />
          </NavbarLink>
          <NavbarLink basePath='games' href='/games'>
            <GamesIcon className="w-8 h-8 col-span-1 fill-current justify-self-center" />
          </NavbarLink>
        </div>

        <div className="flex items-center justify-end col-span-2 px-4 gap-x-3">
          <div className="flex flex-col text-right">
            <p className="text-sm">{session && session.user.name}</p>
            <p className="text-xs">{session && session.user.role}</p>
          </div>
          <div className="flex items-center justify-center w-10 rounded-full bg-WSAI-LightIndigo">
            <figure className="relative w-10 h-10">
              <Image objectFit="cover" src="/avatar.png" alt="wsai logo" layout="fill" />
            </figure>
          </div>
          <button className="w-10 p-2 rounded-full bg-WSAI-LightIndigo focus:outline-none focus:ring">
            <NotificationIcon className="w-6 h-6 stroke-current" />
          </button>
          <button className="w-10 p-2 rounded-full bg-WSAI-LightIndigo focus:outline-none focus:ring">
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
