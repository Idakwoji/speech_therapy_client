import { useState } from "react";
import { Button, Form, Input } from "antd";
import MediaSelection from "./MediaSelection";
import CategoryAndSubSelection from "./CategoryAndSubSelection";
import { useSavePage } from "../../../services/admin/admin.api";
import { useLocation, useNavigate } from "react-router-dom";

const CreatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const theme = searchParams.get("theme");
  const [words, setWords] = useState([]);
  const [blockStates, setBlockStates] = useState([]);
  const { mutate, isPending } = useSavePage();

  const handleSavePage = (values) => {
    console.log('values', values)
    const pageData = {
      theme_name: theme,
      page_name: values.page_name,
      columns: Number(values.columns),
      blocks: words.map((block, index) => ({
        name: block.name,
        table_name: block.table_name,
        audio: blockStates[index]?.audio,
        image: blockStates[index]?.image,
        video: blockStates[index]?.video
      })),
    };
    console.log('pageData', pageData);
    mutate(pageData, {
      onSuccess: () => navigate(-1),
    });
  };
  return (
    <div className="mb-12 w-full">
      <Form onFinish={handleSavePage}>
        <Form.Item
          name="page_name"
          rules={[
            {
              required: true,
              message: "Please input a page name",
            },
          ]}
          className="mx-auto mt-6 w-fit"
        >
          <Input
            placeholder="Enter page name"
            className="h-14 text-4xl font-semibold text-[#151b24] placeholder:text-4xl placeholder:text-[#686e79]"
            variant="borderless"
            autoFocus
          />
        </Form.Item>

        <div className="flex px-12">
          <CategoryAndSubSelection words={words} setWords={setWords} />
          {words.length > 0 && (
            <MediaSelection
              words={words}
              blockStates={blockStates}
              setBlockStates={setBlockStates}
            />
          )}
        </div>

        {words.length > 0 && (
          <Form.Item className="mt-20 flex items-center justify-center">
            <Button
              loading={isPending}
              size="large"
              htmlType="submit"
              className="h-[3.5rem] min-w-[15rem] border-gray-700 text-lg tracking-wide text-gray-600"
            >
              Create Page
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};

export default CreatePage;
