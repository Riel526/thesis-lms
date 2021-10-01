import { useState, useContext } from 'react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import styles from '../../../styles/UserProfile.module.css'
import Image from 'next/image'
import Link from 'next/link'
import FilledButton from '../../../components/Buttons/FilledButton'
import BorderedButton from '../../../components/Buttons/BorderedButton'
import AppContext from '../../../components/context/AppContext'
import {
  BirthdayIcon,
  PhoneIcon,
  EmailIcon,
  SectionIcon,
  CameraIcon,
} from '../../../components/Icons/Icons'

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

  const { setModalAttributes, updateData, changeProfilePhoto } =
    useContext(AppContext)

  const [session, loading] = useSession()
  const [introduction, setIntroduction] = useState(
    props.userInformation.introduction
  )
  const [isEditBio, setIsEditBio] = useState(false)

  const handleChangePhoto = (e) => {
    const userImage = e.target.files[0]
    
    setModalAttributes({
      isOpen: true,
      status: 'loading',
    })

    changeProfilePhoto(
      `${process.env.BASE_URL}/api/teachers/${props.userInformation._id}`,
      userImage,
      'Teachers'
    )
  }

  const handleSaveIntroduction = (e) => {
    e.preventDefault()

    setModalAttributes({
      isOpen: true,
      status: 'loading',
    })

    updateData(`${process.env.BASE_URL}/api/teachers/${session.user._id}`, {
      introduction: introduction,
    })
  }

  return (
    <div className={` ${styles.BoxBG}`}>
      <div className="flex flex-col col-span-12">
        <div className={styles.coverPhoto}>
          <div className="relative w-40 h-40 mx-auto rounded-full mt-28 group">
            
            {!loading && session.user._id == router.query.teacherId && <label
              htmlFor="Change Picture"
              className="absolute z-20 items-center justify-center hidden w-8 h-8 p-1 transition-opacity rounded-full cursor-pointer bg-WSAI-Indigo-500 opacity-90 hover:opacity-100 bottom-1 right-3 group-hover:flex"
            >
              <CameraIcon className="w-5 h-5 fill-current text-WSAI-Indigo-25" />
            </label>}
{           !loading && session.user._id == router.query.teacherId &&  <input
              onChange={(e) => handleChangePhoto(e)}
              type="file"
              name="changePicture"
              className="hidden"
              id="Change Picture"
            />}

            <figure className="relative w-full h-full overflow-hidden border-2 rounded-full border-opacity-70 border-WSAI-Indigo-100">
              <Image
                alt="user"
                objectFit="cover"
                layout="fill"
                accept="image/*"
                src={props.userInformation.image || '/avatar.png'}
              />
            </figure>
          </div
          >
        </div>
        <div className="flex flex-col items-center justify-center pt-10 pb-2 ">
          <h1 className="text-2xl font-medium">
            {props.userInformation.firstName} {props.userInformation.lastName}
          </h1>
        </div>
        <hr className="border border-WSAI-Indigo-200 border-opacity-[15%] max-w-6xl w-full mx-auto mb-2" />
        <div className={`flex items-center justify-between mx-16`}>
          <nav className="flex gap-x-2">
            <Link
              href={`/user/teacher/${props.userInformation._id}?tab=Introduction`}
            >
              <a
                className={`${
                  router.query.tab == 'Introduction' || router.query.tab == null
                    ? 'border-WSAI-Indigo-500'
                    : 'border-transparent'
                } border-b-2 focus:ring focus:outline-none`}
              >
                Introduction
              </a>
            </Link>
          </nav>
          <div className="flex items-center gap-x-2">
            <FilledButton
              transition={
                'before:w-0 hover:before:w-full before:h-1 before:bottom-0 before:left-0 before:bg-WSAI-Orange-500 before:absolute before:transition-[width] before:duration-200'
              }
            >
              Send Message
            </FilledButton>
          </div>
        </div>
        <div className="flex flex-1 h-full p-6 mx-16 my-10 rounded-lg bg-WSAI-Indigo-900 backdrop-blur-sm bg-opacity-10">
          <div className="grid flex-1 grid-cols-2">
            <div className="flex flex-col flex-1 p-6 text-lg gap-y-1">
              <div className="flex gap-x-2">
                <p className="flex items-center gap-x-1">
                  <BirthdayIcon className="w-4 h-4 fill-current" />
                  Birthday:
                </p>
                <p>{props.userInformation.birthDate.split('T')[0]}</p>
              </div>
              <div className="flex gap-x-2">
                <p className="flex items-center gap-x-1">
                  <EmailIcon className="w-4 h-4 fill-current" />
                  Email:
                </p>
                <p>{props.userInformation.email}</p>
              </div>
              <div className="flex gap-x-2">
                <p className="flex items-center gap-x-1">
                  <PhoneIcon className="w-4 h-4 fill-current" />
                  Phone:
                </p>
                <p>{props.userInformation.contactNumber}</p>
              </div>
              <div className="flex gap-x-2">
                <p className="flex items-center gap-x-1">
                  <SectionIcon className="w-4 h-4 fill-current" />
                  Section Advisory:
                </p>
                <p>{props.userInformation.advisorySection && props.userInformation.advisorySection.sectionName}</p>
              </div>
            </div>
            <div>
              {isEditBio ? (
                <form
                  onSubmit={(e) => handleSaveIntroduction(e)}
                  className="flex flex-col w-full overflow-hidden rounded-md bg-WSAI-Indigo-25"
                >
                  <textarea
                    maxLength={600}
                    value={introduction}
                    onChange={(e) =>
                      setIntroduction(e.target.value)
                    }
                    className="w-full rounded-t-md resize-none h-[22rem] focus:outline-none focus:ring focus:ring-inset p-4 bg-transparent"
                    name="introduction"
                    id="Introduction"
                  />
                  <div className="flex items-center justify-end flex-1 px-4 bg-indigo-100 shadow-inner gap-x-4">
                    <BorderedButton
                      onClick={(e) => {
                        e.preventDefault()
                        setIsEditBio(false)
                        setIntroduction(props.userInformation.introduction)
                      }}
                      className="w-24 h-10"
                    >
                      Cancel
                    </BorderedButton>
                    <FilledButton className="h-10 w-28">Save</FilledButton>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col w-full overflow-hidden rounded-md">
                  <div className="flex h-[22rem] p-4 whitespace-pre-wrap break-words ">
                    <p className="flex-1 w-full text-lg first-letter:text-3xl first-letter:uppercase">
                      {props.userInformation.introduction}
                    </p>
                  </div>
                  {!loading && session.user._id == router.query.teacherId && (
                    <div className="flex items-center justify-end flex-1 px-4 gap-x-4">
                      <FilledButton
                        onClick={() => setIsEditBio(true)}
                        className="h-10 w-28"
                      >
                        Edit
                      </FilledButton>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
