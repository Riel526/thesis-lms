import Navbar from '../Navbar/Navbar'
import { useSession } from 'next-auth/client'
import StatusModal from '../Modal/StatusModal'
import AppContext from '../context/AppContext'
import { useContext } from 'react'

const Layout = (props) => {
  const { modalAttributes, setModalAttributes } = useContext(AppContext)

  const [session, loading] = useSession()
  return (
    <div className='relative flex flex-col h-screen text-gray-800 font-Lato'>
      {!loading && session && <Navbar />}
      <div className={`grid w-full h-full grid-cols-12 ${session && 'mt-16'}`}>
        <div
          className={`${
            !loading && session ? 'block' : 'hidden'
          } w-full h-full col-span-2 bg-WSAI-Indigo-50 z-10`}
        ></div>
        <main
          className={` ${
            !loading && session ? 'col-span-8' : ' col-span-12'
          } flex flex-1 w-full h-full`}
        >
          {props.children}
        </main>
        <div
          className={`${
            !loading && session ? 'block' : 'hidden'
          } w-full h-full col-span-2 bg-WSAI-Indigo-50 z-10`}
        ></div>
      </div>
      <StatusModal
        isOpen={modalAttributes.isOpen}
        setModalAttributes={setModalAttributes}
        status={modalAttributes.status}
        customMessage={modalAttributes.customMessage}
      />
    </div>
  )
}

export default Layout
