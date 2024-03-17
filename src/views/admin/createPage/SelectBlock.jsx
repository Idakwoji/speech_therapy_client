import { useState } from "react";
import { Form, Input } from "antd";

const SelectBlock = ({ words }) => {
  const [cols, setCols] = useState(1);
  const [rows, setRows] = useState(1);
  return (
    <div className="w-10/12">
      <div className="flex gap-4">
        <Form.Item
          name="columns"
          rules={[
            {
              required: true,
              message: "Number of columns is required",
            },
            {
              max: 2,
              message: "Invalid number of rows",
            },
          ]}
        >
          <div>
            <span className="font-open-sans text-[13px]">
              Number of columns:
            </span>
            <Input
              onChange={(e) => setCols(Number(e.target.value))}
              placeholder="Enter a number"
              size="large"
              maxLength={2}
            />
          </div>
        </Form.Item>
        <Form.Item
          name="rows"
          rules={[
            {
              max: 2,
              message: "Invalid number of rows",
            },
          ]}
        >
          <div>
            <span className="font-open-sans text-[13px]">Number of rows:</span>
            <Input
              placeholder="Enter a number"
              type="number"
              maxLength={2}
              size="large"
              onChange={(e) => setRows(Number(e.target.value))}
            />
          </div>
        </Form.Item>
      </div>
      <div
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
        className="grid gap-4 pt-8"
      >
        {words.map((word) => (
          <div
            key={word.name}
            className="flex h-[4rem] items-end justify-center truncate rounded-md bg-gradient-to-br from-purple-400 to-purple-700 pb-1 text-base text-white"
          >
            {word.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectBlock;
