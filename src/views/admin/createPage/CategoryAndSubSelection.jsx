import { useEffect, useState } from "react";
import { Button, Form, Input, Space } from "antd";
import { usePerformCategorySearch } from "../../../services/admin/admin.api";
import { BiSearch } from "react-icons/bi";
import SelectSubCategory from "./SelectSubCategory";
import SelectWord from "./SelectWord";
import SelectBlock from "./SelectBlock";

const CategoryAndSubSelection = ({ words, setWords }) => {
  const [categoryLevel, setCategoryLevel] = useState("categories");
  const [searchTerm, setSearchTerm] = useState("");
  const { mutate, isPending, data } = usePerformCategorySearch();
  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(data || {}, "words_data"))
      setCategoryLevel("word");
    else if (Object.prototype.hasOwnProperty.call(data || {}, "categories"))
      setCategoryLevel("categories");
    else if (Object.prototype.hasOwnProperty.call(data || {}, "message"))
      setCategoryLevel("not-found");
  }, [data]);

  return (
    <div className="basis-2/3">
      <p className="-mb-4 font-open-sans text-[13px]">Search category</p>
      <Space.Compact className="mt-5 w-[68%]" size="large">
        <div className="w-full">
          <Form.Item
            name="category"
            className="w-full"
            rules={[{ required: true, message: "Field is required" }]}
          >
            <Input
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Categories"
              className="w-full bg-[#fbfbfc] placeholder:text-gray-400"
            />
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            type="primary"
            className="!w-[4rem] bg-gray-500 text-[1.3rem] duration-300 hover:scale-105"
            icon={<BiSearch className="text-[22px]" />}
            onClick={() => {
              setWords([]);
              setCategoryLevel("categories");
              mutate(searchTerm);
            }}
            loading={isPending}
          />
        </Form.Item>
      </Space.Compact>
      {categoryLevel === "categories" ? (
        <SelectSubCategory
          level={data?.category_level}
          data={data?.categories}
          setWords={setWords}
        />
      ) : categoryLevel === "word" ? (
        <SelectWord data={data?.words_data} setWords={setWords} />
      ) : categoryLevel === "not-found" ? (
        <p className="font-open-sans text-lg">
          Category not found. Try another query
        </p>
      ) : null}
      {words.length > 0 && <SelectBlock words={words} />}
    </div>
  );
};

export default CategoryAndSubSelection;
