import { useState } from "react";
import { useFetchSubCategoryOrWord } from "../../../services/admin/admin.api";
import { Form, Select, Spin } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import SelectWord from "./SelectWord";

const SelectSubCategory = ({ data, setWords, level }) => {
  const { isPending, mutate, data: fetchedData } = useFetchSubCategoryOrWord();
  const [currentCount, setCurrentCount] = useState(0);
  const [currentList, setCurrentList] = useState(fetchedData);
  const filterOption = (input, option) => {
    return (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  };
  const SearchItem = () => {
    return (
      <div className="">
        <p className="mb-0.5 font-open-sans text-[13px]">
          Select a Sub Category
        </p>
        <Form.Item
          name="sub-category"
          rules={[{ required: true, message: "Field is required" }]}
        >
          <Select
            showSearch
            placeholder="Select a Sub Category"
            optionFilterProp="children"
            onChange={(value) => {
              mutate(
                {
                  id: value,
                  category_level: level,
                },
                {
                  onSuccess: (data) => {
                    setCurrentList(data);
                    setCurrentCount((count) => count + 1);
                  },
                },
              );
            }}
            suffixIcon={isPending ? <Spin /> : <IoIosArrowDown size={22} />}
            filterOption={filterOption}
            options={data?.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
            size="large"
            loading={isPending}
            className="w-11/12"
          />
        </Form.Item>
      </div>
    );
  };

  return (
    <div className="mt-6 w-2/3">
      {data && <SearchItem />}
      {
        currentCount === 1 &&
        Object.prototype.hasOwnProperty.call(
          currentList || {},
          "words_data",
        ) ? (
          <div className="w-[110%]">
            <SelectWord data={currentList?.words_data} setWords={setWords} />
          </div>
        ) : Object.prototype.hasOwnProperty.call(
            currentList || {},
            "categories",
          ) ? (
          <SearchItem />
        ) : null
        // <p className="font-open-sans text-lg">
        //   Category not found. Try another query
        // </p>
      }
      {
        currentCount === 2 &&
        Object.prototype.hasOwnProperty.call(
          currentList || {},
          "words_data",
        ) ? (
          <div className="w-[110%]">
            <SelectWord data={currentList?.words_data} setWords={setWords} />
          </div>
        ) : Object.prototype.hasOwnProperty.call(
            currentList || {},
            "categories",
          ) ? (
          <SearchItem />
        ) : null
        // <p className="font-open-sans text-lg">
        //   Category not found. Try another query
        // </p>
      }
    </div>
  );
};

export default SelectSubCategory;
