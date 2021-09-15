import Navbar from "../Navbar/Navbar"
import { useSession } from 'next-auth/client'
import StatusModal from "../Modal/StatusModal"
import AppContext from "../context/AppContext"
import { useContext } from 'react';

const Layout = (props) => {

  const { modalAttributes, setModalAttributes } = useContext(AppContext)

  const [session, loading] = useSession()
  return (
    <div className='relative h-screen text-gray-800 font-Lato'>
      {!loading && session && <Navbar />}
      <div className="grid w-full h-full grid-cols-12">
        <main className="flex flex-1 w-full h-full col-span-12">
          {props.children}
        </main>
      </div>
      <StatusModal isOpen={modalAttributes.isOpen} setModalAttributes={setModalAttributes} status={modalAttributes.status} customMessage={modalAttributes.customMessage} />

    </div>
  )
}

export default Layout
