import Link from 'next/link'
import { useRouter } from 'next/router'

const NavbarLink = ({ href, basePath, children }) => {

  const router = useRouter()

  return (
    <Link href={href}>
      <a className={`${router.pathname.includes(basePath) == true ? 'text-WSAI-Orange-500' : 'text-WSAI-Indigo-25'} focus:outline-none flex justify-center transition-colors hover:text-WSAI-Orange-500 focus:text-WSAI-Orange-300`}>{children}</a>
    </Link>
  )
}

export default NavbarLink
