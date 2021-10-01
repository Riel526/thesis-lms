import { useState, useContext, useCallback, useEffect, useRef } from 'react'
import { useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import FilledButton from '../../../components/Buttons/FilledButton'
import BorderedButton from '../../../components/Buttons/BorderedButton'
import AppContext from '../../../components/context/AppContext'
import SchoolGroupModal from '../../../components/Modal/SchoolGroupModal'

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

  const teachers = await fetch(
    `${process.env.BASE_URL}/api/teachers?select=_id firstName lastName`
  )
    .then((res) => res.json())
    .then((json) => json.data)

  const students = await fetch(
    `${process.env.BASE_URL}/api/students?select=_id firstName lastName`
  )
    .then((res) => res.json())
    .then((json) => json.data)

  const getOptions = (records) => {
    const options = records.map((record) => {
      if (record._id != session.user._id) {
        return {
          _id: record._id,
          name: `${record.firstName} ${record.lastName}`,
        }
      }
      return null
    })

    return options.filter((option) => option != null)
  }

  const teacherOptions = [...getOptions(teachers)]
  const studentOptions = [...getOptions(students)]

  const userInformation = await fetch(
    `${process.env.BASE_URL}/api/teachers/${teacherId}`
  )
    .then((res) => res.json())
    .then((json) => json.data)

  return {
    props: {
      userInformation,
      teacherOptions,
      studentOptions,
      session,
    },
  }
}

const UserGroups = (props) => {
  const router = useRouter()
  const { teacherId } = router.query
  const { groupId } = router.query

  const { setModalAttributes, uploadFiles } = useContext(AppContext)
  const [groupInformation, setGroupInformation] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [isJoinGroup, setIsJoinGroup] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState('')

  const currentPath = `/groups/teacher/${teacherId}`

  const fetchGroupInformation = async (groupId) => {
    console.log(groupInformation)
    const groupInformation = await fetch(
      `${process.env.BASE_URL}/api/groups/${groupId}`
    )
      .then((res) => res.json())
      .then((json) => json.data)

    setGroupInformation(groupInformation)
  }

  return (
    <div className="grid w-full grid-cols-4 bg-WSAI-Indigo-25 text-WSAI-JetBlack">
      <SchoolGroupModal
        teacherOptions={props.teacherOptions}
        studentOptions={props.studentOptions}
        isJoinGroup={isJoinGroup}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setModalAttributes={setModalAttributes}
        uploadFiles={uploadFiles}
        session={props.session}
      />
      <aside className="flex flex-col items-center w-full h-full p-4 border-r gap-y-6 border-WSAI-Indigo-100 ">
        <h1 className="text-3xl text-WSAI-Indigo-500">Your Groups</h1>
        {props.userInformation.groups.map((group) => {
          return (
            <div
              onClick={() => {
                setGroupInformation(fetchGroupInformation(group._id))
              }}
              tabIndex={0}
              key={group._id}
              className={`${
                groupInformation._id == group._id
                  ? 'shadow-md bg-indigo-100 transition-shadow'
                  : 'bg-WSAI-Indigo-100'
              } flex flex-col items-center justify-center w-48 h-48  rounded-md cursor-pointer  gap-y-2 focus:outline-none focus:ring`}
            >
              <figure className="relative w-24 h-24 overflow-hidden rounded-md">
                <Image src={group.image} alt="group" layout="fill" />
              </figure>
              <p className="text-sm font-bold">{group.groupName}</p>
            </div>
          )
        })}
      </aside>
      <main className="w-full h-full col-span-3 ">
        <header className="flex items-center h-20 px-4 border-b border-WSAI-Indigo-100">
          <div className="flex items-end justify-end w-full gap-x-4">
            <BorderedButton
              onClick={(e) => {
                setIsJoinGroup(true)
                setIsOpen(true)
              }}
            >
              Join Group
            </BorderedButton>
            <FilledButton
              onClick={(e) => {
                setIsJoinGroup(false)
                setIsOpen(true)
              }}
              className="h-10"
            >
              Create Group
            </FilledButton>
          </div>
        </header>
        <div className="grid p-4">
          <textarea maxLength={800} className="w-full max-h-[10rem] min-h-[10rem] rounded-t-md bg-WSAI-Indigo-100 p-2 resize-none focus:outline-none focus:ring focus:ring-inset">
              
          </textarea>
          <FilledButton className="rounded-t-none">Add Post</FilledButton>
        </div>
      </main>
    </div>
  )
}

export default UserGroups
