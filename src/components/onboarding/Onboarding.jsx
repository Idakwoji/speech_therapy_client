import { useState } from "react"
import { PickLesson } from "../lesson/pickLesson"
import { Exercise } from "../exercise"

const Onboarding = () => {
    const [picked, setPicked] = useState(false)
    const [exerciseType, setExerciseType] = useState('')
    
    return (
        <div className='relative flex flex-col content-center w-full h-full '>

            {!picked ?
                (<div className='pt-8 text-center text-white'>
                    <h3 className='text-5xl antialiased font-semibold text-white'>logopedie</h3>
                    <p className='pt-4 text-xl font-semibold'>Kies een oefening om door te gaan:</p>
                    <PickLesson setPicked={setPicked} setExerciseType={setExerciseType} />
                </div>)
                :
                (
                    <Exercise exerciseType={exerciseType} />
                )
            }

        </div>
    )
}

export default Onboarding