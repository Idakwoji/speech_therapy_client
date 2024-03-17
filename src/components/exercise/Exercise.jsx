/* eslint-disable react/prop-types */
// import { Sentences } from "./sentences"
import { Words } from "./words"

const Exercise = ({ exerciseType }) => {

  return (
    <div className="flex flex-row h-fit">
      {/* {exerciseType === 'words' ? <Words /> : <Sentences />} */}
      <Words exerciseType={exerciseType}/>
    </div>
  )
}

export default Exercise