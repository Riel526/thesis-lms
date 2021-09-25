import { Dialog, Transition } from '@headlessui/react'
import { CircledCross } from '../Icons/Icons'

export default function ErrorModal({ isOpen, setIsOpen, message }) {

  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-30 overflow-y-auto"
      >

        <Dialog.Overlay className="fixed inset-0 min-h-screen bg-black opacity-80" />

        <div className="flex items-center justify-center min-h-screen">
          <main className="relative z-40 flex flex-col bg-WSAI-Indigo-25 w-[32rem] h-72">
            <header className="flex items-center justify-center w-full p-4 text-white bg-red-400 h-28">
              <CircledCross className="w-16 h-16 fill-current" />
            </header>
            <Dialog.Title className="mt-2 text-3xl font-bold text-center text-red-400">Error</Dialog.Title>
            <Dialog.Description className="mt-4 font-bold text-center text-WSAI-JetBlack">
              {message ? message : 'Something went wrong, please try again'}
            </Dialog.Description>
            <button onClick={() => setIsOpen(false)} className="self-center w-20 p-2 mt-8 text-white bg-red-400 rounded-lg focus:ring focus:outline-none">Dismiss</button>
          </main>
        </div>
      </Dialog>
    </Transition>
  )
}