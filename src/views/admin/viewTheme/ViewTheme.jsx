import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import ErrorMessage from "../../../components/ErrorMessage";
import { Button, Skeleton } from "antd";
import { MdDelete } from "react-icons/md";
import { LuPlusSquare } from "react-icons/lu";
import {
  useDeleteTheme,
  useFetchThemePages,
} from "../../../services/admin/admin.api";

const ViewTheme = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, error } = useFetchThemePages(id);
  const { isPending, mutate: deleteTheme } = useDeleteTheme(id);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage />;
  return (
    <div className="mx-auto h-screen w-[80%] pl-8 pt-20">
      <div className="flex justify-between pb-12 pr-20">
        <h1 className="h-[3rem] w-[16rem] bg-[#EBEDEF] text-4xl font-semibold placeholder:text-black focus:outline-none">
          {data.themeName || <Skeleton active />}
        </h1>

        <Button
          loading={isPending}
          icon={<MdDelete size={24} className="-mb-1" />}
          onClick={deleteTheme}
          type="primary"
          size="large"
          className="h-[2.6rem] bg-red-500 font-open-sans text-base duration-200 hover:scale-105 hover:!bg-red-600"
        >
          Delete theme
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            navigate(`/admin/thema/bladzijde/create?theme=${data.themeName}`);
          }}
          className="flex h-[8rem] w-[16rem] flex-col rounded-md bg-black bg-gradient-to-br from-purple-400 to-purple-700 text-white"
        >
          <div className="flex flex-row">
            <div className="inline-block p-6 text-center text-2xl font-semibold">
              Nieuwe pagina toevoegen{" "}
              <LuPlusSquare className="inline-block h-10 w-10" />
            </div>
          </div>
        </motion.button>

        {data.pages?.length > 0 &&
          data.pages?.map((page) => (
            <motion.button
              key={page.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigate(`/admin/thema/${id}/page/${page.id}`);
              }}
              className="flex h-[8rem] w-[16rem] flex-col rounded-md bg-black bg-gradient-to-br from-sky-300 to-blue-700 text-white"
            >
              <p className="p-6 text-center text-2xl font-semibold">
                {page.page_name}
              </p>
            </motion.button>
          ))}
      </div>
    </div>
  );
};

export default ViewTheme;
