import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import SmallTable from '../../../components/SmallTable/SmallTable'
import ButtonGroup from '../../../components/ButtonGroup/ButtonGroup'
import SubjectAnnouncement from '../../../components/SubjectAnnouncement/SubjectAnnouncement'
import ViewAllButton from '../../../components/Buttons/ViewAllButton'
import FilledButton from '../../../components/Buttons/FilledButton'
import AddModuleModal from '../../../components/Modal/AddModuleModal'
import { AddIcon } from '../../../components/Icons/Icons'



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

  return (
    <div className="grid items-center flex-1 w-full grid-cols-12">
      <Head>
        <title>Modules - {props.subjectInformation.subjectName}</title>
      </Head>
      <AddModuleModal isOpen={isOpen} setIsOpen={setIsOpen}/> 

      <div className="flex flex-col w-full h-full col-span-12 bg-WSAI-Indigo-25">
        <header className="col-span-3 h-60">
          {
            
          }
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
            <div className="flex mt-3 gap-x-2">
              <ViewAllButton />
              <FilledButton onClick={() => setIsOpen(true)} className="font-bold" icon={<AddIcon className="w-5 h-5 fill-current" />}>Add Announcement</FilledButton>
            </div>
          </section>
          <ButtonGroup />
        </main>
      </div>
    </div>
  )
}

export default Overview
