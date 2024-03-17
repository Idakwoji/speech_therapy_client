// import { useState } from "react"
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/navbar";

const Admin = () => {
  // const [mode, setMode] = useState('')

  return (
    <div className="flex min-h-screen w-screen flex-row bg-[#EBEDEF] font-open-sans">
      {/*  #CED4DA */}
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Admin;
