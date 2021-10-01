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

  const options = [...getOptions(teachers), ...getOptions(students)]

  const userInformation = await fetch(
    `${process.env.BASE_URL}/api/teachers/${teacherId}`
  )
    .then((res) => res.json())
    .then((json) => json.data)

  return {
    props: {
      userInformation,
      options,
      session,
    },
  }
}

const UserGroups = (props) => {
  const router = useRouter()

  const { setModalAttributes, uploadFiles } = useContext(AppContext)
  const [groupInformation, setGroupInformation] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [isJoinGroup, setIsJoinGroup] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState('')
  const isMounted = useRef(true)

  useEffect(() => {
    const getUpdatedGroupData = async () => {
      await fetch(`${process.env.BASE_URL}/api/groups/${selectedGroup}`)
        .then((res) => res.json())
        .then((json) => console.log(json.data))
    }
    if (isMounted.current) {
      isMounted.current = false
    } else {
      const result = getUpdatedGroupData()
      console.log(result)
      console.log(groupInformation)
      setGroupInformation(result)
    }
  }, [selectedGroup])

  return (
    <div className="grid w-full grid-cols-4 bg-WSAI-Indigo-25 text-WSAI-JetBlack">
      <SchoolGroupModal
        options={props.options}
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
              onClick={() => setSelectedGroup(group._id)}
              tabIndex={0}
              key={group._id}
              className={`${
                groupInformation._id == group._id &&
                'bg-WSAI-Indigo-500 text-WSAI-Indigo-25'
              } flex flex-col items-center justify-center w-48 h-48 rounded-md cursor-pointer bg-WSAI-Indigo-100 gap-y-2 focus:outline-none focus:ring`}
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
        <div className="grid">{}</div>
      </main>
    </div>
  )
}

export default UserGroups
