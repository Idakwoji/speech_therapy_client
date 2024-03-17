import { useState } from "react";
import { LuPlusSquare } from "react-icons/lu";
import TitleInput from "../../../../components/titleInput/TitleInput";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const [themeSaved, setThemeSaved] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-[80%] h-screen pt-20 pl-8 mx-auto">
      <div className="pb-12">
        <TitleInput setThemeSaved={setThemeSaved} />
      </div>
      <div className="grid grid-cols-3 gap-20">
        <div className="grid grid-cols-3 gap-20">
          <button
            disabled={themeSaved === false}
            onClick={() => {
              navigate("/admin/thema/bladzijde/create");
            }}
            className={`flex disabled:from-gray-400 disabled:to-gray-500 disabled:opacity-80 enabled:from-purple-400 enabled:to-purple-600 disabled:text-gray-200 hover:enabled:scale-105 duration-200 flex-col w-[16rem] h-[8rem] rounded-md bg-black text-white bg-gradient-to-br`}
          >
            <div className="flex flex-row">
              <div className="inline-block p-6 text-2xl font-semibold text-center">
                Nieuwe pagina toevoegen{" "}
                <LuPlusSquare className="inline-block w-9 h-9" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
