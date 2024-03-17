import { Link } from "react-router-dom";
import { LuPlusSquare } from "react-icons/lu";
import { motion } from "framer-motion";
import Loader from "../../../components/Loader";
import ErrorMessage from "../../../components/ErrorMessage";
import { useFetchAllThemes } from "../../../services/admin/admin.api";

const Theme = () => {
  const { data, isLoading, error } = useFetchAllThemes();
  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <div className="w-[80%] h-screen pt-20 pl-8 mx-auto">
      <div className="pb-12">
        <h1 className="text-4xl font-semibold w-[16rem] h-[3rem] bg-[#EBEDEF] placeholder:text-black focus:outline-none">
          Thema
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col w-[16rem] h-[8rem] rounded-md bg-black text-white bg-gradient-to-br from-purple-400 to-purple-700"
        >
          <Link to="/admin/thema/bladzijde">
            <div className="flex flex-row">
              <div className="inline-block p-6 text-2xl font-semibold text-center">
                Nieuw thema maken{" "}
                <LuPlusSquare className="inline-block w-9 h-9" />
              </div>
            </div>
          </Link>
        </motion.button>

        {data?.themes?.length > 0 &&
          data.themes.map((template) => (
            <Link
              key={template.id}
              to={String(template.id)}
              className="hover:scale-105 duration-300 flex flex-col w-[16rem] h-[8rem] rounded-md bg-black text-white bg-gradient-to-br from-sky-300 to-blue-700"
            >
              <span className="p-6 text-2xl font-semibold text-center">
                {template.theme_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Theme;
