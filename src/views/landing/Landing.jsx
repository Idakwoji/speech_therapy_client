import LandingBtn from './LandingBtn'
import { FaUserMd } from 'react-icons/fa'
import { RiAdminFill } from 'react-icons/ri'

export const Landing = () => {
  return (
    <div className="h-screen w-full bg-[#1F2937] pt-12">
      <div className="grid grid-cols-1 gap-20 md:grid-cols-3 md:px-20 md:py-5">
        <LandingBtn to="/login/client">client</LandingBtn>
        <LandingBtn to="/login/therapist" icon={<FaUserMd />}>
          therapist
        </LandingBtn>
        <LandingBtn to="/login/admin" icon={<RiAdminFill />}>
          admin
        </LandingBtn>
        <>
          {/* <Link className="h-fit w-fit" to="/admin">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="shadow-md shadow-blue-500/50 flex flex-col w-[16rem] h-[4rem] rounded-md bg-black text-white bg-gradient-to-br from-blue-300 to-blue-700"
          >
            <p className="w-full p-6 text-3xl font-semibold text-end ">
              Client
            </p>
          </motion.button>
        </Link> */}
          {/* <Link className="h-fit w-fit" to="/admin">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="shadow-md shadow-orange-500/50 flex flex-col w-[16rem] h-[4rem] rounded-md bg-black text-white bg-gradient-to-br from-orange-300 to-orange-700"
          >
            <p className="w-full p-6 text-3xl font-semibold text-end">
              Therapist
            </p>
          </motion.button>
        </Link> */}

          {/* <Link className="h-fit w-fit" to="/admin">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="shadow-md shadow-purple-400/50 flex flex-col w-[16rem] h-[4rem] rounded-md bg-black text-white bg-gradient-to-br from-purple-400 to-purple-700"
          >
            <p className="w-full p-6 text-3xl font-semibold text-end">Admin</p>
          </motion.button>
        </Link> */}
        </>
      </div>
    </div>
  )
}
