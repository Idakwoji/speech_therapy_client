/* eslint-disable react/prop-types */
const BlockCard = ({index}) => {
  return (
    <div className="relative flex flex-col content-end justify-end w-64 rounded-md h-36 max:w-72 bg-gradient-to-br from-blue-300 to-blue-800">
      <img className="absolute z-10 w-full h-full bg-cover rounded-md opacity-70" src="/vector.jpg" alt="" />
      <h2 className='z-20 px-4 text-xl font-bold w-fit'>Block {index}</h2>
    </div>
  )
}

export default BlockCard