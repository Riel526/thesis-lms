import { useState, useContext, useEffect } from 'react'
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import FilledButton from '../../../components/Buttons/FilledButton'
import BorderedButton from '../../../components/Buttons/BorderedButton'
import AppContext from '../../../components/context/AppContext'
import SchoolGroupModal from '../../../components/Modal/SchoolGroupModal'
import { AttachFileIcon } from '../../../components/Icons/Icons'

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

  const { setModalAttributes, uploadFiles } = useContext(AppContext)
  const [groupInformation, setGroupInformation] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [isJoinGroup, setIsJoinGroup] = useState(false)
  const [searchGroup, setSearchGroup] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('')
  const [file, setFile] = useState(null)

  const [post, setPost] = useState({
    content: '',
    attachedFile: null,
    postedBy: props.session.user._id,
    postedOnId: groupInformation ? groupInformation._id : '',
  })

  useEffect(() => {
    setPost((prevState) => ({
      ...prevState,
      postedOnId: groupInformation ? groupInformation._id : '',
    }))
  }, [groupInformation])

  useEffect(() => {
    const fetchGroupInformation = async () => {
      const res = await fetch(
        `${process.env.BASE_URL}/api/groups/${selectedGroup}`
      )
      const { data } = await res.json()
      setGroupInformation(data)
    }

    fetchGroupInformation()
  }, [selectedGroup])

  const handleSubmitPost = (e) => {
    e.preventDefault()

    setModalAttributes({
      isOpen: true,
      status: 'loading',
      customMessage: '',
    })

    setPost({
      content: '',
      attachedFile: null,
      postedBy: props.session.user._id,
      postedOnId: groupInformation ? groupInformation._id : '',
    })

    uploadFiles(
      `${process.env.BASE_URL}/api/posts/posts-group?role=teacher`,
      post,
      file,
      'Posts',
      false
    )
  }

  useEffect(() => {})

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
      <aside className="flex flex-col items-center w-full h-full border-r border-WSAI-Indigo-100 ">
        <header className="flex items-center justify-center w-full h-[5.5rem] px-4 border-b border-WSAI-Indigo-100">
          <h1 className="text-3xl text-WSAI-Indigo-500">Your Groups</h1>
        </header>
        <div className="flex flex-col items-center w-full h-full p-4 gap-y-6">
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="groupSearch" className="mb-1 text-sm uppercase">
              Search
            </label>
            <input
              onChange={(e) => setSearchGroup(e.target.value)}
              value={searchGroup}
              className="p-2 rounded-md shadow-inner focus:ring focus:outline-none ring-inset bg-WSAI-Indigo-100"
              type="text"
              name="searchGroup"
              id="Search Group"
            />
          </div>
          {props.userInformation.groups.map((group) => {
            return (
              <div
                onClick={() => {
                  setSelectedGroup(group._id)
                }}
                tabIndex={0}
                key={group._id}
                className={`${
                  groupInformation && groupInformation._id == group._id
                    ? 'shadow-md ring font-bold transition-shadow ring-WSAI-Indigo-500'
                    : ''
                } flex flex-col items-center bg-WSAI-Indigo-100 hover:ring justify-center w-48 h-48  rounded-md cursor-pointer  gap-y-2 focus:outline-none focus:ring`}
              >
                <figure className="relative w-24 h-24 overflow-hidden rounded-md">
                  <Image src={group.image} alt="group" layout="fill" />
                </figure>
                <p className="text-sm font-bold">{group.groupName}</p>
              </div>
            )
          })}
        </div>
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
        {groupInformation && (
          <div className="grid p-4">
            <form
              onSubmit={(e) => handleSubmitPost(e)}
              className="flex flex-col "
            >
              <textarea
                onChange={(e) =>
                  setPost((prevState) => ({
                    ...prevState,
                    content: e.target.value,
                  }))
                }
                value={post.content}
                maxLength={500}
                className="w-full shadow-inner max-h-[10rem] min-h-[10rem] rounded-md bg-WSAI-Indigo-100 p-2 resize-none focus:outline-none focus:ring focus:ring-inset"
              />
              <div className="flex items-center justify-end pt-2 gap-x-4 ">
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  id="Attach File"
                  name="attachFile"
                  className="hidden"
                />
                {file && (
                  <div className="text-sm text-WSAI-Indigo-300">
                    Attached: {file.name}
                  </div>
                )}
                <label
                  tabIndex={0}
                  htmlFor="Attach File"
                  className="flex items-center justify-center w-8 h-8 transition-colors rounded-full cursor-pointer focus:ring focus:outline-none bg-WSAI-Indigo-100 hover:bg-WSAI-Indigo-400 hover:text-WSAI-Indigo-25"
                >
                  <AttachFileIcon className="w-4 h-5 fill-current" />
                </label>
                <FilledButton
                  className="h-10 rounded-md w-28"
                  transition="none"
                >
                  Add Post
                </FilledButton>
              </div>
            </form>
            <div className="flex flex-col-reverse">
              {groupInformation.posts != null &&
                groupInformation.posts.map((post) => {
                  return (
                    <article
                      className="flex flex-col justify-center min-w-full mt-4 rounded-md "
                      key={post._id}
                    >
                      <div className="flex items-center p-2 gap-x-2">
                        <figure className="relative w-8 h-8 overflow-hidden rounded-full">
                          <Image
                            src={
                              post.postedByTeacher
                                ? `${post.postedByTeacher.image}`
                                : `${post.postedByStudent.image}`
                            }
                            layout="fill"
                            alt="hey"
                            objectPosition="cover"
                          />
                        </figure>
                        <div className="flex flex-col">
                          <h1 className="text-sm">
                            {post.postedByTeacher
                              ? `${post.postedByTeacher.firstName} ${post.postedByTeacher.lastName}`
                              : `${post.postedByStudent.firstName} ${post.postedByStudent.lastName}`}
                          </h1>
                          <h2 className="text-xs">
                            {post.datePosted.toString().split('T')[0]}
                          </h2>
                        </div>
                      </div>
                      <div className="relative flex flex-col w-full h-auto overflow-hidden rounded-md bg-WSAI-Indigo-100 gap-y-4">
                        <p className="p-2 ">{post.content}</p>
                        {post.attachedFile && (
                          <figure className="relative self-center w-40 h-40 ">
                            <Image
                              alt={post.content}
                              src={post.attachedFile}
                              layout="fill"
                              objectFit="cover"
                              objectPosition="center"
                            />
                          </figure>
                        )}
                        <div className="flex items-center justify-center w-full bg-WSAI-Indigo-200 ">
                          <input
                            max={400}
                            placeholder="Type your comment here..."
                            className="w-full px-3 py-1 m-2 bg-transparent rounded-full text-WSAI-Indigo-25 placeholder-WSAI-Indigo-25 focus:outline-none"
                            type="text"
                            name="comment"
                            id="Comment"
                          />
                        </div>
                      </div>
                    </article>
                  )
                })}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default UserGroups
