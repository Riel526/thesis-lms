import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import ButtonGroup from '../../../components/ButtonGroup/ButtonGroup'
import ViewAllButton from '../../../components/Buttons/ViewAllButton'
import FilledButton from '../../../components/Buttons/FilledButton'
import AddModuleModal from '../../../components/Modal/AddModuleModal'
import { AddIcon } from '../../../components/Icons/Icons'
import styles from '../../../styles/Modules.module.css'
import BorderedButton from '../../../components/Buttons/BorderedButton'
import AddTaskModal from '../../../components/Modal/AddTaskModal'

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
const quarters = [
  'First Quarter',
  'Second Quarter',
  'Third Quarter',
  'Fourth Quarter',
]
const Overview = (props) => {
  const [isOpenModuleModal, setIsOpenModuleModal] = useState(false)
  const [isOpenTaskModal, setIsOpenTaskModal] = useState(false)
  return (
    <div className='grid items-center flex-1 w-full grid-cols-12 text-WSAI-JetBlack'>
      <Head>
        <title>Modules - {props.subjectInformation.subjectName}</title>
      </Head>
      <AddModuleModal
        subjectId={props.subjectInformation._id}
        isOpen={isOpenModuleModal}
        setIsOpen={setIsOpenModuleModal}
      />
      <AddTaskModal
        subjectId={props.subjectInformation._id}
        isOpen={isOpenTaskModal}
        setIsOpen={setIsOpenTaskModal}
      />

      <div className='flex flex-col w-full h-full col-span-12 bg-WSAI-Indigo-25'>
        <header className='col-span-3 pt-6 mb-4'>
          <h1 className='text-5xl font-light text-center'>{quarters[0]}</h1>
        </header>

        <main className='relative flex flex-col flex-1 w-full pt-3 '>
          <section className='grid grid-cols-2 px-32 gap-y-8 gap-x-16'>
            {props.subjectInformation.modules &&
              props.subjectInformation.modules.map((module) => {
                return (
                  <a
                    href={module.attachedFile}
                    key={module._id}
                    target='_blank'
                    rel='noreferrer'
                    className={`w-full h-52 ${styles.moduleBg1} justify-self-center flex flex-col p-6 rounded-md overflow-hidden focus:outline-none focus:ring`}
                  >
                    <h2 className='text-lg font-bold'>{module.moduleTitle}</h2>
                    <p className=''>{module.moduleDescription}</p>
                  </a>
                )
              })}
          </section>

          <div className='flex justify-center mt-3 gap-x-2'>
            <BorderedButton onClick={() => setIsOpenTaskModal(true)}>
              Add Task
            </BorderedButton>
            <FilledButton
              onClick={() => setIsOpenModuleModal(true)}
              className='font-bold'
              icon={<AddIcon className='w-5 h-5 fill-current' />}
            >
              Add Module
            </FilledButton>
          </div>

          <ButtonGroup />
        </main>
      </div>
    </div>
  )
}

export default Overview
