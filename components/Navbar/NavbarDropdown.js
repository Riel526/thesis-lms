import { Menu, Transition } from '@headlessui/react'
import { SettingIcon, SignOutIcon } from '../Icons/Icons'
import { signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Link from 'next/link'

const NavbarDropdown = (props) => {
  const router = useRouter()

  const [session, loading] = useSession()

  const handleSignout = e => {
    e.preventDefault()
    signOut({ callbackUrl: process.env.BASE_URL })
  }

  return (
    <Menu as='div' className=''>
      <Menu.Button className='flex items-center justify-center w-10 p-3 rounded-full bg-WSAI-LightIndigo focus:outline-none focus:ring'>
        {props.children}
      </Menu.Button>
      <Transition
        enter='transition duration-100 ease-out'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition duration-75 ease-out'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <Menu.Items className='absolute mt-4 overflow-hidden divide-y divide-gray-100 rounded-lg shadow-lg right-7 w-52 bg-WSAI-White text-WSAI-Indigo ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <Menu.Item>
            {({ active }) => (
              <Link href='/account-settings'>
                <a
                  className={`${active &&
                    'bg-WSAI-Indigo text-WSAI-White'} group flex items-center px-4 py-2 text-sm transition-colors gap-x-4 hover:bg-WSAI-Indigo hover:text-WSAI-White`}

                >
                  <SettingIcon
                    className={`w-4 h-4 transition-colors fill-current group-hover:text-WSAI-White ${active
                      ? 'text-WSAI-White'
                      : 'text-WSAI-Indigo'}`}
                  />
                  Account Settings
                </a>
              </Link>
            )}
          </Menu.Item>
          {!loading &&
            session && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active &&
                      'bg-WSAI-Indigo text-WSAI-White'} group flex items-center px-4 py-2 text-sm w-full transition-colors gap-x-4`}
                    onClick={e => handleSignout(e)}
                  >
                    <SignOutIcon
                      className={`w-5 h-4 transition-colors fill-current group-hover:text-WSAI-White ${active
                        ? 'text-WSAI-White'
                        : 'text-WSAI-Indigo'}`}
                    />
                    Logout
                  </button>
                )}
              </Menu.Item>
            )}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
export default NavbarDropdown
