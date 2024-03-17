import { useEffect, useState } from "react";
import { Input } from "antd";

const BlocksPage = ({ pickedSearch, setCols, setRows }) => {
  const [rowNumber, setRowNumber] = useState("");
  const [colNumber, setColNumber] = useState("");

  useEffect(() => {
    setCols(colNumber);
    setRows(rowNumber);
  }, [rowNumber, colNumber, setCols, setRows]);

  return (
    <div className="flex h-full w-full flex-col px-8 pt-4">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2">
          <h3>Number of columns:</h3>
          <Input
            placeholder="enter a number"
            onChange={(e) => {
              setColNumber(e.target.value);
            }}
            value={colNumber}
            type="number"
            maxLength={2}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3>Number of rows:</h3>
          <Input
            placeholder="enter a number"
            onChange={(e) => {
              setRowNumber(e.target.value);
            }}
            value={rowNumber}
            type="number"
            maxLength={2}
          />
        </div>
      </div>
      <div className="flex flex-col overflow-scroll">
        <div
          className={`grid pt-8 grid-cols-[repeat(${colNumber},minmax(0,1fr))] grid-rows-[repeat(${rowNumber},minmax(0,1fr))]`}
        >
          {/* {pickedSearch.map((search) => {
            return (
              <div
                key={search.name}
                className="mb-4 flex flex-col justify-end max-w-[6rem] w-fit h-[4rem]  rounded-md bg-black text-white bg-gradient-to-br from-purple-400 to-purple-700"
              >
                <div className="flex flex-row px-6 pb-2 overflow-hidden">
                  {search.name}
                </div>
              </div>
            );
          })} */}
          <div className="mb-4 flex h-[4rem] w-fit max-w-[6rem] flex-col justify-end  rounded-md bg-black bg-gradient-to-br from-purple-400 to-purple-700 text-white">
            <div className="flex flex-row overflow-hidden px-6 pb-2">
              {pickedSearch.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlocksPage;
