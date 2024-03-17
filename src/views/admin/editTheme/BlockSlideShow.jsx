/* eslint-disable react/prop-types */

const BlocksNav = ({ blockCount, currentBlock, setCurrentBlock }) => {

    const handleClick = (i) => {
        setCurrentBlock(i + 1)
    }
    const blocks = Array.from({ length: blockCount }, (_, i) => (
        <button
            key={i + 1}
            onClick={() => { handleClick(i) }}
            className={`relative flex flex-col content-end justify-end h-fit border-2 ${(i + 1) === currentBlock && 'border-purple-800'} rounded-lg w-36 bg-gradient-to-br from-blue-300 to-blue-800`}>
            <img className="absolute z-10 object-cover w-full h-full rounded-lg opacity-70" src="/vector.jpg" alt="" />
            <h2 className='z-20 px-4 text-xl font-bold w-fit'>{i + 1}</h2>
        </button>
    ));


    return (
        <div className="flex-row hidden gap-5 pt-12 pb-4 overflow-x-scroll h-fit md:flex">
            {blocks}
        </div>
    )
}
const BlockSlideShow = ({ blockCount, currentBlock, setCurrentBlock }) => {
    //  if active, give purple border around it

    return (

        <div className="flex-row hidden gap-5 pb-4 overflow-x-scroll h-fit md:flex">
            <BlocksNav blockCount={blockCount} currentBlock={currentBlock} setCurrentBlock={setCurrentBlock} />
        </div>
    )
}

export default BlockSlideShow