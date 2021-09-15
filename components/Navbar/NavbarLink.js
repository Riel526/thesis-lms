import Link from 'next/link'
import { useRouter } from 'next/router'

const NavbarLink = ({ href, basePath, children }) => {

  const router = useRouter()

  return (
    <Link href={href}>
      <a tabIndex={0} className={`contents ${router.pathname.includes(basePath) == true ? 'text-WSAI-Orange' : 'text-WSAI-White'} transition-colors hover:text-WSAI-Orange focus:text-WSAI-Orange`}>{children}</a>
    </Link>
  )
}

export default NavbarLink
