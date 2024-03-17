import { useState } from "react";
import { Button, Input, Space, message } from "antd";
import {
  useCheckThemeExistence,
  useSaveTheme,
} from "../../services/admin/admin.api";
import { FiSave } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";

const TitleInput = ({ setThemeSaved }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const showMsg = (content, type = "error") => {
    messageApi.open({
      type,
      content,
      duration: 1,
    });
  };
  const {
    mutate: checkTheme,
    data: themeExists,
    error: checkError,
    isSuccess: isChecked,
    isPending: isChecking,
    reset: resetCheck,
  } = useCheckThemeExistence(searchTerm);

  const {
    mutate: saveThemeName,
    error: saveError,
    isPending: isSaving,
    isSuccess: isSaved,
    reset: resetSave,
  } = useSaveTheme(searchTerm, () => setThemeSaved(true));
  /**
   * The handleInput function resets saved and checked states if saved, resets checked state if checked,
   * and sets the search term based on the input value.
   */
  const handleInput = (e) => {
    if (isSaved) {
      resetCheck();
      resetSave();
    } else if (isChecked) resetCheck();
    setSearchTerm(e.target.value);
  };

  /**
   * The function `handleCheckClick` checks if a theme name is valid and available, displaying
   * appropriate messages based on the result.
   */
  const handleCheckClick = () => {
    const term = searchTerm.trim();
    if (term.length === 0) showMsg("Theme name must be more than one letter");
    else {
      checkTheme(term);
      if (checkError) {
        console.log({ checkError, msg: checkError.message });
        showMsg(checkError.message);
      } else if (themeExists === false)
        showMsg("Theme name is available", "success");
    }
  };
  const handleSaveClick = () => {
    saveThemeName(searchTerm);
    if (saveError) showMsg(saveError.message);
    else {
      showMsg("Theme name saved successfully", "success");
    }
  };

  return (
    <>
      {contextHolder}
      <Space.Compact className="w-[60%] h-[3.3rem]" size="large">
        <span className="w-full">
          <Input
            placeholder="Nieuwe Thema"
            autoFocus
            value={searchTerm}
            className={`${
              themeExists === false ? "border-green-600" : ""
            } bg-[#fbfbfc] text-[1.5rem] placeholder:text-gray-400`}
            onChange={handleInput}
            status={themeExists ? "error" : ""}
          />
          {themeExists === false && (
            <span className="text-green-600 text-sm">
              Theme name is available
            </span>
          )}
          {themeExists && (
            <span className="text-red-600 text-sm">
              Theme name already exists
            </span>
          )}
        </span>
        {themeExists === false ? (
          <Button
            type="primary"
            className="bg-purple-500 w-[8rem] h-[3.3rem] text-[1.3rem] hover:scale-105 duration-300"
            icon={<FiSave className="-mb-1 text-[22px]" />}
            onClick={handleSaveClick}
            loading={isSaving}
            disabled={isSaved}
          >
            Save
          </Button>
        ) : (
          <Button
            type="primary"
            className="bg-gray-500 w-[8rem] h-[3.3rem] text-[1.3rem] hover:scale-105 duration-300"
            icon={<BiSearch className="-mb-0.5 text-[22px]" />}
            onClick={handleCheckClick}
            loading={isChecking}
          >
            Check
          </Button>
        )}
      </Space.Compact>
    </>
  );
};

export default TitleInput;

// /* eslint-disable react/prop-types */
// import { useMutation } from "@tanstack/react-query";
// import { useEffect, useRef, useState } from "react";
// // import editImg from '../../assets/edit-3-svgrepo-com.svg'
// import saveImg from "../../assets/save-svgrepo-com.svg";
// import axios from "axios";
// // import { motion } from "framer-motion";
// import { Button } from "antd";

// const TitleInput = ({
//   title,
//   setTitle,
//   endpoint,
//   placeholder,
//   nameTaken,
//   setNameTaken,
//   setHasSavedTheme,
// }) => {
//   const [titleColor, setTitleColor] = useState();
//   const [prevText, setPrevText] = useState("");

//   const inputRef = useRef(null);
//   const saveBtnRef = useRef(null);

//   const checkTitle = useMutation({
//     mutationFn: async (title) => {
//       try {
//         const response = await axios.post(endpoint, title);
//         const result = response.data;
//         return result.exists;
//       } catch (error) {
//         console.error("Error checking title:", error.message);
//         throw error; // Rethrow the error to mark the mutation as failed
//       }
//     },
//   });

//   const saveTheme = useMutation({
//     mutationFn: async (themeName) => {
//       console.log("save theme func firing");
//       try {
//         const response = await axios.post(
//           "/api/save_theme",
//           { theme_name: themeName },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         return response.data;
//       } catch (error) {
//         console.error("Error saving theme:", error.message);
//         throw error; // Rethrow the error to mark the mutation as failed
//       }
//     },
//   });

//   const hasSavedTheme = saveTheme.data;
//   if (hasSavedTheme) {
//     setHasSavedTheme(true);
//     if (saveBtnRef.current) {
//       saveBtnRef.current.disabled = true;
//     }
//   }

//   const handleSave = (title) => {
//     setHasSavedTheme(true); //THIS WILL BE REMOVED & REPLACED WITH THE ONE AT THE TOP LATER
//     saveTheme.mutate(title);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (title !== prevText) {
//           checkTitle.mutate({ theme_name: title });
//           if (checkTitle.isError) {
//             console.log("Error checking title:", checkTitle.error.message);
//           } else {
//             const isNameTaken = checkTitle.data && checkTitle.data.exists;
//             setNameTaken(isNameTaken);
//             setTitleColor(isNameTaken ? "red-500" : "black");
//             console.log(
//               isNameTaken ? "name is unavailable" : "name is available"
//             );
//           }
//         }
//       } catch (error) {
//         console.error("Error in useEffect:", error.message);
//       } finally {
//         setPrevText(title);
//       }
//     };

//     fetchData();
//   }, [title, prevText, checkTitle, setNameTaken]);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       if (title !== prevText) {
//   //         await checkTitle.mutate({ theme_name: title });

//   //         if (checkTitle.isError) {
//   //           console.log("Error checking title:", checkTitle.error.message);
//   //         } else {
//   //           setNameTaken(checkTitle.data.exists);
//   //           setTitleColor(checkTitle.data.exists ? "red-500" : "black");
//   //           console.log(
//   //             checkTitle.data.exists
//   //               ? "name is unavailable"
//   //               : "name is available"
//   //           );
//   //         }
//   //       }
//   //     } catch (error) {
//   //       console.error("Error in useEffect:", error.message);
//   //     } finally {
//   //       setPrevText(title);
//   //     }
//   //   };

//   //   fetchData();
//   // }, [title, prevText, checkTitle, setNameTaken]);

//   return (
//     <div className="flex flex-row">
//       {/* thema title */}
//       {/* Nieuwe Pagina */}
//       <input
//         className={`text-4xl font-semibold text-${titleColor} w-[16.5rem] h-[3rem] bg-[#EBEDEF] placeholder:text-black focus:outline-none`}
//         type="text"
//         placeholder={placeholder}
//         ref={inputRef}
//         value={title}
//         autoFocus
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <Button
//         loading={saveTheme.isPending}
//         icon={
//           <img
//             draggable={false}
//             className="inline-block w-5 h-5"
//             src={saveImg}
//             alt="edit"
//           />
//         }
//         disabled={nameTaken}
//         ref={saveBtnRef}
//         onClick={() => handleSave(title)}
//         style={{
//           width: "2.5rem",
//         }}
//         className={`custom-save-btn w-10 h-10 p-1 ${
//           nameTaken ? "bg-gray-500" : "bg-purple-500 hover:bg-red-300"
//         } rounded-lg`}
//       />
//       {/* <motion.button
//         whileTap={{ scale: 0.95 }}
//         disabled={nameTaken}
//         ref={saveBtnRef}
//         onClick={() => handleSave(title)}
//         className={`w-10 h-10 p-1 ${
//           nameTaken ? "bg-gray-500" : "bg-purple-500"
//         } rounded-lg`}
//       >
//         <img
//           draggable={false}
//           className="inline-block w-5 h-5"
//           src={saveImg}
//           alt="edit"
//         />
//       </motion.button> */}
//     </div>
//   );
// };

// export default TitleInput;
