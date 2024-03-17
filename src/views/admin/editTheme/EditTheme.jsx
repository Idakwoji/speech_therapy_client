import { useState } from "react";
import FirstPane from "./firstPane/FirstPane";
// import SearchPane from "./SearchPane";
// import ThirdPane from "./ThirdPane";
import { useLocation } from "react-router-dom";

const onChange = (e) => {
  console.log("Change:", e.target.value);
};

const EditTheme = () => {
  const { state } = useLocation();
  const themeName = state;

  const [pageTitle, setPageTitle] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [currentBlock, setCurrentBlock] = useState(0);
  // const [isOpen, setIsOpen] = useState(false)
  const [blockCount, setBlockCount] = useState("");

  return (
    <div className="flex flex-col w-screen h-full mx-auto overflow-hidden">
      <div className="flex flex-row justify-center py-12">
        {/* <h3 className="text-4xl pt-4 font-semibold text-${titleColor} w-[16.5rem] h-[3rem] bg-[#EBEDEF] placeholder:text-black focus:outline-none">
          {themeName || "Test"}
        </h3> */}
        <input
          className="text-4xl font-semibold text-black w-[16.5rem] h-[3rem] bg-[#EBEDEF] placeholder:text-gray-700 focus:outline-none"
          type="text"
          placeholder="New Page"
          value={pageTitle}
          autoFocus
          onChange={(e) => setPageTitle(e.target.value)}
        />
      </div>
      <FirstPane
        themeName={themeName}
        pageTitle={pageTitle}
        setPageTitle={setPageTitle}
        currentBlock={currentBlock}
        setCurrentBlock={setCurrentBlock}
        blockCount={blockCount}
        setBlockCount={setBlockCount}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        setOnChange={onChange}
      />
    </div>
  );
};

export default EditTheme;
