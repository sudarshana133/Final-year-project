import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Bottombar from "./Bottombar";

const UserLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        {/* Large screen mode */}
        <div className="hidden md:block w-56">
          <Sidebar />
        </div>
        {/* Small screen mode */}
        <div className="fixed flex justify-center bottom-0 w-full md:hidden z-[999]">
          <Bottombar />
        </div>
        <main className="flex-1 bg-slate-100 md:pl-2 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
