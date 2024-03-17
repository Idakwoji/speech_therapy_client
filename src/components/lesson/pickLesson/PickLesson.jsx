/* eslint-disable react/prop-types */
import { motion } from "framer-motion"

const PickLesson = ({ setPicked, setExerciseType }) => {
  return (
    <div>
      <div className='flex flex-row justify-between pt-20 mx-auto w-fit gap-x-24'>
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={()=>{setPicked(true); setExerciseType("words")}}
          className='relative w-64 h-48 bg-[#faa613] text-white rounded-2xl flex flex-row justify-center content-end'>
          <p className="absolute text-5xl antialiased font-semibold h-fit bottom-8">woorden</p>
        </motion.div>

        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={()=>{{setPicked(true);  setExerciseType("sentences")}}}
          className='relative w-64 h-48 bg-[#FF715B] text-white rounded-2xl flex flex-row justify-center content-end'>
          <p className="absolute text-5xl antialiased font-semibold h-fit bottom-8">zinnen</p>
        </motion.div>
      </div>
    </div>
  )
}

export default PickLesson