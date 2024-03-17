import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-96 w-full">
      <Spin size="large"></Spin>
    </div>
  );
};

export default Loader;
