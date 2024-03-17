import { MdErrorOutline } from 'react-icons/md'

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-2">
      <MdErrorOutline color="#EF4444" fontSize="4rem" />
      <p className="text-lg font-medium text-red-500">
        {message || `Error. Something went wrong...`}
      </p>
    </div>
  )
}

export default ErrorMessage
