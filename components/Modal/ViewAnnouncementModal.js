import { Dialog } from '@headlessui/react'
import BorderedButton from '../Buttons/BorderedButton'
import FilledButton from './../Buttons/FilledButton'
import { useState, useContext } from 'react'
import AppContext from '../context/AppContext'

export default function ViewAnnouncementModal({
  isOpen,
  setIsOpen,
  title,
  content,
  createdAt,
}) {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        className='fixed inset-0 z-40 flex items-center justify-center h-full overflow-y-auto'
      >
        <Dialog.Overlay className='fixed inset-0 z-10 flex text-center transition-transform duration-300 ease-in-out bg-gray-900 bg-opacity-80' />

        <div className={`relative z-50`}>
          <div
            className={` bg-WSAI-Indigo-25 h-[25rem] text-WSAI-JetBlack flex flex-col w-[40rem]  overflow-y-auto rounded-md`}
          >
            <header className='flex items-center justify-between w-full h-12 p-2 text-lg font-medium border-b border-WSAI-Indigo-100'>
              <h1>{title}</h1>
              <div className='text-sm'>
                {createdAt.toString().split('T')[0]}
              </div>
            </header>
            <main className='flex flex-col p-2 break-words gap-y-1'>
              <div>{content}</div>
            </main>
            <div className='absolute bottom-0 right-0 flex justify-end w-full p-2 rounded-b-md justify-self-end gap-x-2 bg-WSAI-Indigo-50'>
              <BorderedButton
                colors={
                  'hover:bg-red-600 hover:text-WSAI-Indigo-25 focus:bg-red-600 focus:text-WSAI-Indigo-25 border-red-600 text-red-600'
                }
                onClick={(e) => {
                  setIsOpen(false)
                }}
                className='relative z-50 '
              >
                Close
              </BorderedButton>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}
