import { Dialog } from '@headlessui/react'
import BorderedButton from '../Buttons/BorderedButton'
import FilledButton from './../Buttons/FilledButton'
import { useState, useContext } from 'react'
import AppContext from '../context/AppContext'

export default function AddTaskModal({ isOpen, setIsOpen, subjectId }) {
  const { saveData, setModalAttributes } = useContext(AppContext)

  const [taskDetail, setTaskDetail] = useState({
    title: '',
    content: '',
    subject: subjectId,
  })

  const handleChange = (e) => {
    const key = e.target.name
    const value = e.target.value

    setTaskDetail((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setModalAttributes({
      isOpen: true,
      status: 'loading',
      customMessage: '',
    })

    saveData(`${process.env.BASE_URL}/api/tasks`, taskDetail)
    resetFields()
    setIsOpen(false)
  }

  const resetFields = () => {
    setTaskDetail({
      title: '',
      content: '',
      subject: subjectId,
    })
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {
          resetFields()
          setIsOpen(false)
        }}
        className='fixed inset-0 z-40 flex items-center justify-center h-full overflow-y-auto'
      >
        <Dialog.Overlay className='fixed inset-0 z-10 flex text-center transition-transform duration-300 ease-in-out bg-gray-900 bg-opacity-80' />

        <div className={`relative z-50`}>
          <div
            className={` bg-WSAI-Indigo-25 h-[25rem] text-WSAI-JetBlack flex flex-col w-96 max-w-xs overflow-y-scrolly rounded-md`}
          >
            <header className='w-full h-12 p-2 text-lg font-medium border-b border-WSAI-Indigo-100'>
              Add Task
            </header>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className='flex flex-col p-2 gap-y-4'
            >
              <div className='flex flex-col gap-y-1'>
                <label htmlFor='Task Name'>*Task Name:</label>
                <input
                  onChange={(e) => handleChange(e)}
                  value={taskDetail.title}
                  required
                  className='rounded-md focus:outline-none focus:ring focus:ring-inset p-1.5 shadow-inner bg-WSAI-Indigo-100'
                  name='title'
                  id='Task Name'
                />
              </div>
              <div className='flex flex-col gap-y-1'>
                <label htmlFor='task Content'>*Content:</label>
                <textarea
                  onChange={(e) => handleChange(e)}
                  value={taskDetail.content}
                  required
                  className='rounded-md focus:outline-none focus:ring focus:ring-inset p-1.5 h-40 shadow-inner resize-none bg-WSAI-Indigo-100'
                  name='content'
                  id='task Content'
                />
              </div>
              <div className='absolute bottom-0 right-0 flex justify-end w-full p-2 rounded-b-md justify-self-end gap-x-2 bg-WSAI-Indigo-50'>
                <BorderedButton
                  colors={
                    'hover:bg-red-600 hover:text-WSAI-Indigo-25 focus:bg-red-600 focus:text-WSAI-Indigo-25 border-red-600 text-red-600'
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    resetFields()
                    setIsOpen(false)
                  }}
                  className='relative z-50 '
                >
                  Cancel
                </BorderedButton>
                <FilledButton>Submit</FilledButton>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </>
  )
}
