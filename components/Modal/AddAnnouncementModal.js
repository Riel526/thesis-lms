import { Dialog } from '@headlessui/react'
import BorderedButton from '../Buttons/BorderedButton'
import FilledButton from './../Buttons/FilledButton'

export default function AddAnnouncementModal({ isOpen, setIsOpen }) {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        className="fixed inset-0 z-40 flex items-center justify-center h-full overflow-y-auto"
      >
        <Dialog.Overlay className="fixed inset-0 z-10 flex text-center transition-transform duration-300 ease-in-out bg-gray-900 bg-opacity-80" />

        <div className={`relative z-50`}>
          <div
            className={` bg-WSAI-Indigo-25 h-[25rem] text-WSAI-JetBlack flex flex-col w-96 max-w-xs overflow-hidden rounded-md`}
          >
            <header className="w-full h-12 p-2 text-lg font-medium border-b border-WSAI-Indigo-100">
              Add Announcement
            </header>
            <form className="flex flex-col p-2 gap-y-4">
              <div className="flex flex-col gap-y-1">
                <label htmlFor="Announcement Title">Title:</label>
                <input
                  className="rounded-md focus:outline-none focus:ring focus:ring-inset p-1.5 shadow-inner bg-WSAI-Indigo-100"
                  name="announcementTitle"
                  id="Announcement Title"
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="Announcement Content">Content:</label>
                <textarea
                  className="rounded-md focus:outline-none focus:ring focus:ring-inset p-1.5 h-40 shadow-inner resize-none bg-WSAI-Indigo-100"
                  name="announcementContent"
                  id="Announcement Content"
                />
              </div>
              <div className="absolute bottom-0 right-0 flex justify-end w-full p-2 rounded-b-md justify-self-end gap-x-2 bg-WSAI-Indigo-50">
                <BorderedButton
                  colors={
                    'hover:bg-red-600 hover:text-WSAI-Indigo-25 focus:bg-red-600 focus:text-WSAI-Indigo-25 border-red-600 text-red-600'
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    setIsOpen(false)
                  }}
                  className="relative z-50 "
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
