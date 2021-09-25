import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  TasksIcon,
  ModulesIcon,
  OverviewIcon,
  AttendanceIcon,
  ShowButtonGroup,
  HideButtonGroup,
} from './../Icons/Icons'
import { useRouter } from 'next/router'
import { Transition } from '@headlessui/react'

const ButtonGroup = () => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const id = router.asPath.split('/')[3]
  const currentPath =
    router.asPath.split('/')[1] + '/' + router.asPath.split('/')[2]

  return (
    <div className="fixed flex flex-col items-center w-32 bottom-4 gap-y-4">
      <nav className="flex flex-col gap-y-3">
        <Transition
          show={isOpen}
          enter="transition ease-in-out duration-300 transform opacity pointer-events-none"
          enterFrom="translate-y-20 opacity-0"
          enterTo="translate-y-0 opacity-100"
          leave="transition ease-in-out duration-300 transform opacity delay-200 pointer-events-none"
          leaveFrom="translate-y-0 opacity-100"
          leaveTo="translate-y-20 opacity-0"
        >
          <Link href={`/subjects/tasks/${id}`}>
            <a className="flex flex-col items-center">
              <div className="text-xs font-black text-center text-WSAI-Indigo-500">
                Tasks
              </div>
              <div
                className={`${
                  currentPath == 'subjects/tasks'
                    ? 'bg-WSAI-Indigo-500 text-WSAI-Indigo-50'
                    : 'bg-WSAI-Indigo-50 text-WSAI-Indigo-500'
                } flex flex-col items-center justify-center w-12 h-12 rounded-full hover:bg-WSAI-Indigo-500 hover:text-WSAI-Indigo-50 focus:bg-WSAI-Indigo-500 focus:text-WSAI-Indigo-50 focus:ring focus:outline-none`}
              >
                <TasksIcon className="w-6 h-6 fill-current" />
              </div>
            </a>
          </Link>
        </Transition>

        <Transition
          show={isOpen}
          enter="transition ease-in-out duration-300 transform opacity pointer-events-none"
          enterFrom="translate-y-20 opacity-0"
          enterTo="translate-y-0 opacity-100"
          leave="transition ease-in-out duration-300 transform opacity delay-150 pointer-events-none"
          leaveFrom="translate-y-0 opacity-100"
          leaveTo="translate-y-20 opacity-0"
        >
          <Link href={`/subjects/modules/${id}`}>
            <a className="flex flex-col items-center">
              <div className="text-xs font-black text-center text-WSAI-Indigo-500">
                Modules
              </div>
              <div
                className={`${
                  currentPath == 'subjects/modules'
                    ? 'bg-WSAI-Indigo-500 text-WSAI-Indigo-50'
                    : 'bg-WSAI-Indigo-50 text-WSAI-Indigo-500'
                } flex flex-col items-center justify-center w-12 h-12 rounded-full hover:bg-WSAI-Indigo-500 hover:text-WSAI-Indigo-50 focus:bg-WSAI-Indigo-500 focus:text-WSAI-Indigo-50 focus:ring focus:outline-none`}
              >
                <ModulesIcon className="w-6 h-6 fill-current" />
              </div>
            </a>
          </Link>
        </Transition>

        <Transition
          show={isOpen}
          enter="transition ease-in-out duration-300 transform opacity pointer-events-none"
          enterFrom="translate-y-20 opacity-0"
          enterTo="translate-y-0 opacity-100"
          leave="transition ease-in-out duration-300 transform opacity delay-100 pointer-events-none"
          leaveFrom="translate-y-0 opacity-100"
          leaveTo="translate-y-20 opacity-0"
        >
          <Link href={`/subjects/overview/${id}`}>
            <a className="flex flex-col items-center">
              <div className="text-xs font-black text-center text-WSAI-Indigo-500">
                Overview
              </div>
              <div
                className={`${
                  currentPath == 'subjects/overview'
                    ? 'bg-WSAI-Indigo-500 text-WSAI-Indigo-50'
                    : 'bg-WSAI-Indigo-50 text-WSAI-Indigo-500'
                } flex flex-col items-center justify-center w-12 h-12 rounded-full hover:bg-WSAI-Indigo-500 hover:text-WSAI-Indigo-50 focus:bg-WSAI-Indigo-500 focus:text-WSAI-Indigo-50 focus:ring focus:outline-none`}
              >
                <OverviewIcon className="w-6 h-6 fill-current" />
              </div>
            </a>
          </Link>
        </Transition>

        <Transition
          show={isOpen}
          enter="transition ease-in-out duration-300 transform opacity pointer-events-none"
          enterFrom="translate-y-20 opacity-0"
          enterTo="translate-y-0 opacity-100"
          leave="transition ease-in-out duration-300 transform opacity delay-75 pointer-events-none"
          leaveFrom="translate-y-0 opacity-100"
          leaveTo="translate-y-20 opacity-0"
        >
          <Link href={`/subjects/attendance/${id}`}>
            <a className="flex flex-col items-center">
              <div className="text-xs font-black text-center text-WSAI-Indigo-500">
                Attendance
              </div>
              <div
                className={`${
                  currentPath == 'subjects/attendance'
                    ? 'bg-WSAI-Indigo-500 text-WSAI-Indigo-50'
                    : 'bg-WSAI-Indigo-50 text-WSAI-Indigo-500'
                } flex flex-col items-center justify-center w-12 h-12 rounded-full hover:bg-WSAI-Indigo-500 hover:text-WSAI-Indigo-50 focus:bg-WSAI-Indigo-500 focus:text-WSAI-Indigo-50 focus:ring focus:outline-none`}
              >
                <AttendanceIcon className="w-6 h-6 fill-current" />
              </div>
            </a>
          </Link>
        </Transition>
      </nav>
      <button
        onClick={() => setIsOpen((prevState) => !prevState)}
        className="flex items-center justify-center rounded-full w-14 h-14 bg-WSAI-Indigo-50 text-WSAI-Indigo-500 hover:bg-WSAI-Indigo-500 hover:text-WSAI-Indigo-50 focus:bg-WSAI-Indigo-500 focus:text-WSAI-Indigo-50 focus:ring focus:outline-none "
      >
        {isOpen ? (
          <ShowButtonGroup className="w-6 h-6 fill-current" />
        ) : (
          <HideButtonGroup className="w-6 h-6 fill-current" />
        )}
      </button>
    </div>
  )
}

export default ButtonGroup
