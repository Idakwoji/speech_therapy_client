/* eslint-disable react/prop-types */
import SentenceComparison from './SentenceComarison';

const DiffUse = ({diffInput}) => {
// const diffInput = {
//   correct_sentence: "App is in the showboo",
//   transcribed_sentence: "App is in the boom",
//   missing_phonemes: ["oh", "yada", "yada"]
// }

  return (
    <div className='pt-4 text-3xl'>
      {diffInput=== undefined ?
      " "
      :
      <SentenceComparison correctSentence={diffInput.correct_sentence} transcribedSentence={diffInput.transcribed_sentence}/>
    }
    </div>
  );
};

//to update all state from parent component in the child component, let's pass set state

export default DiffUse;