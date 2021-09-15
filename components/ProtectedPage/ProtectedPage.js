import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React from 'react'

const ProtectedPage = ({ children }) => {

  const router = useRouter()

  const [session, loading] = useSession()


  if (!session & loading) {
    return (
      <div>Loading...</div>
    )
  }

  if (!session & !loading) {
    router.replace('/')
  }

  if (session && loading)
    return (
      { children }
    )
}

export default ProtectedPage
