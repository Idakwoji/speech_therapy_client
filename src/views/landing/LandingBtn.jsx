import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const LandingBtn = ({ children, icon, to }) => {
  return (
    <Link
      className={`flex w-full flex-col items-center gap-y-2 rounded-md bg-black bg-gradient-to-br p-3 text-3xl font-semibold capitalize text-white shadow duration-500 hover:scale-110 ${styles[children]}`}
      to={to || 'admin'}
    >
      {icon || <FaUser />}
      <span>{children}</span>
    </Link>
  )
}

export default LandingBtn
const styles = {
  client: 'shadow-blue-500/50 from-blue-300 to-blue-700',
  therapist: 'shadow-orange-500/50 from-orange-300 to-orange-700',
  admin: 'shadow-purple-400/50 from-purple-400 to-purple-700',
}
