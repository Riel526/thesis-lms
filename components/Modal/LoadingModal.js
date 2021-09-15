import { Dialog, Transition } from '@headlessui/react'
import { LoadingSpinner } from '../Icons/Icons'

export default function LoadingModal({ isOpen, setIsOpen }) {
  const message = [
    `"Everything comes in time to him who knows how to wait." ~ Leo Tolstoy`,
    `"All things come to him who waits." ~ Woodrow Wilson`,
    `"Everything comes to him who hustles while he waits." ~ Thomas A. Edison`,
    `"What is delayed is not lost." ~ Juliette Drouet`,
    `"It's better to be one who is told to wait than one who waits to be told." ~ John G. Miller`,
    `"A hero is one who knows how to hang on one minute longer." ~ Novalis`,
    `"All things come to him who waits - even justice." ~ Austin O'Malley`,
    `"Good things come to those who wait." ~ Jess C Scott`,
  ]

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
          <main className="relative z-40 flex flex-col bg-WSAI-White w-[32rem] h-72">
            <header className="flex items-center justify-center w-full p-4 text-white bg-blue-600 h-28">
              <LoadingSpinner className="w-16 h-16 fill-current" />
            </header>
            <Dialog.Title className="mt-2 text-3xl font-bold text-center text-blue-600">Loading</Dialog.Title>
            <Dialog.Description className="p-1 mt-3 font-bold text-center text-WSAI-JetBlack">
              {message[Math.floor(message.length * Math.random())]}
            </Dialog.Description>
            <button onClick={() => setIsOpen(false)} className="absolute w-20 p-2 mt-8 text-white -translate-x-1/2 bg-blue-600 rounded-lg bottom-2 left-1/2 focus:ring focus:outline-none">Cancel</button>
          </main>
        </div>
      </Dialog>
    </Transition>
  )
}