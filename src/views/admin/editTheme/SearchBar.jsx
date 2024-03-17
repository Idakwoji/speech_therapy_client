import { Divider, Input, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useSearchText } from "../../../services/admin/admin.api";
const { Search } = Input;
// import { IoCloseCircle } from "react-icons/io5";

const SearchBar = ({
  searchResult,
  setSearchResult,
  pickedSearch,
  setPickedSearch,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const {
    mutate: search,
    data,
    isPending,
    isSuccess,
    isError,
  } = useSearchText({ query: searchValue });
  // const searchMutate = useMutation({
  //   mutationFn: async (searchValue) => {
  //     try {
  //       const response = await axios.post("/api/dynamic_search", searchValue);
  //       if (response.status >= 200 && response.status < 300) {
  //         const jsonResponse = await response.data;
  //         const searchResponse = jsonResponse.results;
  //         return searchResponse;
  //       } else {
  //         throw new Error("Network response was not ok");
  //       }
  //     } catch (error) {
  //       console.error("Error in search mutation:", error.message);
  //       throw error;
  //     }
  //   },
  // });

  useEffect(() => {
    if (isSuccess) setSearchResult(data);
  }, [data, isSuccess, setSearchResult]);
  const handleSearch = () => {
    if (searchValue.trim() === "") setSearchResult([]);
    else search();
  };
  // const handleClear = () => {
  //   console.log("is clearing");
  //   setSearchValue("");
  //   setSearchResult([]);
  // };
  const handleClick = (search) => {
    //add to selected array
    setPickedSearch(...pickedSearch, {
      name: search.name,
      table_name: search.table_name,
      options: "",
      audio: search.audio,
      image: search.image,
      video: search.video,
    });
  };
  return (
    <div className="relative h-fit w-full">
      <span className="w-full">
        <Search
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          placeholder="Input search text"
          allowClear
          // allowClear={{
          //   clearIcon: (
          //     <button onClick={handleClear}>
          //       <IoCloseCircle size={18} />
          //     </button>
          //   ),
          // }}
          onSearch={handleSearch}
          size="large"
          loading={isPending}
          status={isError ? "error" : ""}
        />
        {isError && (
          <span className="text-sm text-red-500">
            Error updating search query
          </span>
        )}
      </span>
      <Divider />
      <div className="h-[25rem] overflow-y-scroll">
        {isPending ? (
          <div className="mt-6">
            <Skeleton active />
          </div>
        ) : (
          searchResult &&
          searchResult.map((search) => {
            return (
              <button
                onClick={() => handleClick(search)}
                key={search.name}
                className="flex h-12 w-full flex-row items-center justify-between border-b-2 px-2 shadow"
              >
                <p className="text-lg font-semibold capitalize">
                  {search.name}
                </p>
                <div className="flex h-full flex-col justify-end">
                  <p className="text-sm opacity-55">
                    {" "}
                    from {search.table_name}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>
      {/* <div className='flex flex-row w-full h-8 pl-4 bg-white rounded-lg'>
                <input className='w-[95%] focus:outline-none rounded-lg' type="text" name="" id="" />
                <button className='w-[5%]'></button>
            </div> */}
    </div>
  );
};

export default SearchBar;
