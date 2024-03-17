import { useEffect } from "react";
import SearchResult from "../editTheme/firstPane/SearchResult";
const MediaSelection = ({ words, blockStates, setBlockStates }) => {
  useEffect(() => {
    // Dynamically initialize the state for each block based on selectedWords
    const initialBlockStates = words.map(() => ({
      audio: false,
      image: false,
      video: false,
  }));
    // console.log('initialBlockStates', initialBlockStates)
    setBlockStates(initialBlockStates);
  }, [setBlockStates, words]);
  /**
   * The function `handleCheckboxChange` takes in a block index and type as parameters, and returns a
   * function that updates the state of block states based on checkbox changes.
   */
  const handleCheckboxChange = (blockIndex, type) => (e) => {

    blockStates[blockIndex][type] = e.target.checked
    setBlockStates([...blockStates])
  };

  return (
    <div className="flex max-h-[34rem] basis-2/5 flex-col gap-y-6 overflow-y-scroll">
      {words.map((word, index) => (
        <SearchResult
          handleChange={handleCheckboxChange}
          key={word.id}
          index={index}
          blockStates={blockStates}
          {...word}
        />
      ))}
    </div>
  );
};

export default MediaSelection;
