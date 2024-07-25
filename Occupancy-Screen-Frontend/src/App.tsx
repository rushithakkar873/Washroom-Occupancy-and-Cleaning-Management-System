import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminJanitorsList from "./pages/admin/JanitorsList";
import AdminWashroomList from "./pages/admin/WashroomList";
import LoginPgae from "./pages/Login";
import PrivateRoutes from "./components/custom/PrivateRoutes";

function App() {
  return (
    <>
      <Router>
        <div className="md:hidden">
          <div className="flex h-screen items-center justify-center bg-black">
            <div className="text-center p-6">
              <p className="text-2xl font-bold text-white">
                Welcome to <br /> Washroom Occupancy & Cleaning Management App!
              </p>
              <p className="text-md mt-4 text-white">
                For the best experience, please open this on a tablet or larger
                screen.
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <Routes>
            <Route path="/" element={<Navigate replace to="/status-screen/1" />} />
            <Route path="/status-screen/:washroomId" element={<Home />} />
            <Route path="login" element={<LoginPgae />} />
            <Route path="admin" element={<PrivateRoutes />}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route index path="dashboard" element={<AdminDashboard />} />
              <Route path="washroom-list" element={<AdminWashroomList />} />
              <Route path="janitors-list" element={<AdminJanitorsList />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
