import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  }
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="h-full bg-white shadow-md flex flex-col">
        <div className="p-5 border-b border-gray-200">
          <h1 className="text-lg font-bold">Admin Panel</h1>
        </div>
        <div className="grow flex flex-col justify-between p-3">
          <ul className="flex flex-col">
            <li className="">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "p-3 lg:pl-4 lg:pr-16 block bg-black hover:bg-gray-800 text-white rounded-md"
                    : "p-3 lg:pl-4 lg:pr-16 block text-black hover:bg-gray-100 rounded-md"
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/washroom-list"
                className={({ isActive }) =>
                  isActive
                    ? "p-3 lg:pl-4 lg:pr-16 block bg-black hover:bg-gray-800 text-white rounded-md"
                    : "p-3 lg:pl-4 lg:pr-16 block text-black hover:bg-gray-100 rounded-md"
                }
              >
                Washroom List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/janitors-list"
                className={({ isActive }) =>
                  isActive
                    ? "p-3 lg:pl-4 lg:pr-16 block bg-black hover:bg-gray-800 text-white rounded-md"
                    : "p-3 lg:pl-4 lg:pr-16 block text-black hover:bg-gray-100 rounded-md"
                }
              >
                Janitors List
              </NavLink>
            </li>
          </ul>
          <Button
          onClick={logout}
            variant={"outline"}
            className="w-full text-md text-red-500 border-red-300 hover:text-white hover:bg-red-500"
          >
            <LogOutIcon className="mr-2 h-4 w-4"/> Logout
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <Outlet /> {/* This is where the nested routes will be rendered */}
      </div>
    </div>
  );
};

export default AdminLayout;
