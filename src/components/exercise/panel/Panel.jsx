/* eslint-disable react/prop-types */
const Panel = ({ setExercise, arrayResponse }) => {
    return (
        <div>
            <div className='h-screen px-8 pt-4 text-xl font-semibold text-white bg-[#6366F1] w-fit overflow-y-scroll'>
                <div className=' w-fit'>
                    {/* <p className='w-32 py-3 pb-8'>Speech Theraphy</p> */}
                    <div className='flex flex-col px-2 py-2 bg-white h-fit w-fit rounded-xl'>
                        <div className="flex flex-row content-end justify-center">
                            <div className="w-10 h-10 bg-black rounded-xl">
                                <img className="h-10 object-fit rounded-xl" src="/vector.jpg" alt="cute"/>
                            </div>
                            <div className="pl-2 text-black"><p>Student</p></div>
                        </div>
                    </div>
                </div>
                
                {arrayResponse ?
                    arrayResponse.map((exercise) => {
                        return (
                            <div key={exercise.id} className='w-fit'>
                                <button
                                    className='w-32 p-0 py-3 m-0 focus:text-gray-800'
                                    onClick={() => { setExercise(exercise.id) }}>{exercise.name}</button>
                                <div className='w-full bg-white rounded-sm h-[2px]'></div>
                            </div>
                        )
                    })
                    :
                    <div></div>
                }
            </div>
        </div>
    )
}

export default Panel