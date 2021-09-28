import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import SmallTable from '../../../components/SmallTable/SmallTable'
import ButtonGroup from '../../../components/ButtonGroup/ButtonGroup'
import SubjectAnnouncement from '../../../components/SubjectAnnouncement/SubjectAnnouncement'
import ViewAllButton from '../../../components/Buttons/ViewAllButton'
import FilledButton from '../../../components/Buttons/FilledButton'
import AddAnnouncementModal from '../../../components/Modal/AddAnnouncementModal'
import { AddIcon } from '../../../components/Icons/Icons'
import { useSession } from 'next-auth/client'

export async function getServerSideProps(context) {
  const { subjectId } = context.query

  const subjectInformation = await fetch(
    `${process.env.BASE_URL}/api/subjects/${subjectId}`
  )
    .then((res) => res.json())
    .then((json) => json.data)

  return {
    props: {
      subjectInformation,
    },
  }
}

const Overview = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [session, loading] = useSession()

  return (
    <div className="grid items-center flex-1 w-full grid-cols-12">
      <Head>
        <title>Overview - {props.subjectInformation.subjectName}</title>
      </Head>
      <AddAnnouncementModal isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex flex-col w-full h-full col-span-12 bg-WSAI-Indigo-25">
        <header className="col-span-3 h-60">
          <div className="relative inset-x-0 top-0 grid grid-rows-3">
            <div className="absolute inset-x-0 inset-y-0 z-20 bg-black bg-opacity-[45%]" />
            <Image
              src={props.subjectInformation.image || '/blurredcover.jfif'}
              quality={1}
              layout="fill"
              objectFit="cover"
              className="z-10 blur-xl"
              alt={props.subjectInformation.subjectName}
            />

            <div className="relative z-30 flex flex-col justify-center row-span-2 row-start-1 p-4 text-center gap-y-1 text-WSAI-Indigo-25">
              <h1 className="text-6xl font-bold uppercase">
                {props.subjectInformation.subjectName}
              </h1>
              <p className="">{props.subjectInformation.subjectDescription}</p>
            </div>

            <div className="z-30 flex items-end justify-between row-start-3 p-4 gap-y-1 text-WSAI-Indigo-25">
              <div className="flex items-end gap-x-2">
                <figure className="relative w-12 h-12 rounded-full bg-WSAI-Indigo-25">
                  <Image
                    src={
                      props.subjectInformation.teacher.image || '/avatar.png'
                    }
                    quality={1}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                    alt="role"
                  />
                </figure>
                <div className="flex flex-col">
                  <h6 className="font-bold">{`${props.subjectInformation.teacher.firstName} ${props.subjectInformation.teacher.lastName}`}</h6>
                  <p className="first-letter:uppercase">
                    {props.subjectInformation.teacher.role}
                  </p>
                </div>
              </div>
              <div className="flex flex-col font-bold">
                <h1>{props.subjectInformation.section.sectionName}</h1>
              </div>
            </div>
          </div>
        </header>

        <main className="relative flex flex-col flex-1 w-full pt-3 ">
          <section className="flex justify-center w-full">
            <div className="grid grid-cols-3 gap-x-8">
              <SmallTable
                tableHeaders={['Task', 'Start Date', 'Due Date']}
                records={props.subjectInformation.students}
                tableName="Tasks"
              />
              <SmallTable
                tableHeaders={['Module', 'Type', 'Quarter']}
                records={props.subjectInformation.students}
                tableName="Recently Added Modules"
              />
              <SmallTable
                tableHeaders={['Image', 'First Name', 'Last Name']}
                records={props.subjectInformation.students}
                tableName="Students"
              />
            </div>
          </section>

          <section className="flex flex-col items-center w-full mt-3 gap-y-3 gap-x-8">
            <h2 className="font-bold text-WSAI-JetBlack">Announcements</h2>
            <div className="grid grid-cols-4 gap-x-11 gap-y-4">
              <SubjectAnnouncement />
              <SubjectAnnouncement />
              <SubjectAnnouncement />
              <SubjectAnnouncement />
            </div>
            {!loading && props.subjectInformation.teacher._id == session.user._id && (
              <div className="flex mt-3 gap-x-2">
                <ViewAllButton />
                <FilledButton
                  onClick={() => setIsOpen(true)}
                  className="font-bold"
                  icon={<AddIcon className="w-5 h-5 fill-current" />}
                >
                  Add Announcement
                </FilledButton>
              </div>
            )}
          </section>
          <ButtonGroup />
        </main>
      </div>
    </div>
  )
}

export default Overview
