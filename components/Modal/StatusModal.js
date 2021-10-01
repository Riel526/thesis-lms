import { LoadingSpinner, CircledCheck, CircledCross } from '../Icons/Icons'
import { Dialog } from '@headlessui/react'

export default function StatusModal({ setModalAttributes, customMessage, status, isOpen }) {
  const controller = new AbortController()
  const message = {
    success: 'The operation finished successfully!',
    error: 'Something went wrong, please try again',
    loading: [
      `"Everything comes in time to him who knows how to wait." ~ Leo Tolstoy`,
      `"All things come to him who waits." ~ Woodrow Wilson`,
      `"Everything comes to him who hustles while he waits." ~ Thomas A. Edison`,
      `"What is delayed is not lost." ~ Juliette Drouet`,
      `"It's better to be one who is told to wait than one who waits to be told." ~ John G. Miller`,
      `"A hero is one who knows how to hang on one minute longer." ~ Novalis`,
      `"All things come to him who waits - even justice." ~ Austin O'Malley`,
      `"Good things come to those who wait." ~ Jess C Scott`,
    ],
  }

  return (
    <>
      <Dialog
        open={isOpen} onClose={() => setModalAttributes({ isOpen: false, })}
        className="fixed inset-0 z-50 flex items-center justify-center h-full overflow-y-auto"
      >
        <Dialog.Overlay className='fixed inset-0 z-10 flex text-center transition-transform duration-300 ease-in-out bg-gray-900 bg-opacity-80' />

        <div
          className={`relative z-50 bg-WSAI-Indigo-25 text-WSAI-JetBlack flex flex-col justify-center w-full max-w-xs overflow-hidden rounded-md duration-500 ease-in-out shadow p-4`}
        >
          <div className='flex flex-col items-center justify-center h-28 max-h-28'>
            {status == 'error' && (
              <CircledCross className='w-10 h-10 text-red-400 fill-current' />
            )}
            {status == 'loading' && <LoadingSpinner />}
            {status == 'success' && (
              <CircledCheck className='w-10 h-10 text-green-400 fill-current' />
            )}
          </div>
          <header className='flex flex-col items-center -mt-8'>
            <h1 className={`text-2xl font-bold first-letter:capitalize ${status == 'success' ? 'text-green-400' : status == 'loading' ? 'text-blue-400' : status == 'error' ? 'text-red-400' : ''}`}>
              {status}
            </h1>
          </header>
          <main className={`mt-6 mb-10 text-center `}>
            {customMessage
              ? customMessage
              : status == 'success'
                ? message.success
                : status == 'error'
                  ? message.error
                  : status == 'loading'
                    ? message.loading[
                    Math.floor(message.loading.length * Math.random())
                    ]
                    : ''}
          </main>
          <button
            onClick={() => {
              if (status != 'loading') {
                setModalAttributes({
                  isOpen: false,
                })
              } else {
                controller.abort
                setModalAttributes({
                  isOpen: false,
                })
              }
            }}
            className={`${status == 'loading'
              ? 'bg-blue-400'
              : status == 'success'
                ? 'bg-green-400'
                : status == 'error'
                  ? 'bg-red-400'
                  : 'bg-black'
              } absolute bottom-0 inset-x-0 w-full text-center text-white p-2 fill-current`}
          >
            {status != 'loading' ? 'Dismiss' : 'Cancel'}
          </button>

        </div>
      </Dialog>
    </>
  )
}
