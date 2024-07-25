// State imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosResponse } from "axios";

// React-Icons imports
import { MdOutlineCleaningServices } from "react-icons/md";
import { GrAnnounce } from "react-icons/gr";

// UI component imports
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import VerifyJanitorForm from "@/components/custom/VerifyJanitorForm";

// Utils imports
import { STATUS_CONSTANT } from "@/utils/constants";
import { StatusType, WashroomType } from "@/utils/types";
import ApiHelper from "@/utils/apiHelper";
import { renderIconBasedOnStatus } from "@/utils/renderIconBasedOnStatus";

const statusClasses = {
  Available: "bg-[#d4edbc] text-green-800",
  Occupied: "bg-[#ffcfc9] text-red-800",
  Cleaning: "bg-[#ffe5a0] text-yellow-800",
  Announcement: "bg-[#bfe1f6] text-blue-800",
};

const statusDropdownClasses = {
  Available: "text-green-800 border-green-800 hover:bg-green-800",
  Occupied: "text-red-800 border-red-800 hover:bg-red-800",
  Cleaning: "text-yellow-800 border-yellow-800 hover:bg-yellow-800",
  Announcement: "text-blue-800 border-blue-800 hover:bg-blue-800",
};

const janitorButtonClasses = {
  Available: "hover:text-green-800 hover:border-green-800 bg-green-800",
  Occupied: "hover:text-red-800 hover:border-red-800 bg-red-800",
  Cleaning: "hover:text-yellow-800 hover:border-yellow-800 bg-yellow-800",
  Announcement: "hover:text-blue-800 hover:border-blue-800 bg-blue-800",
};

const Home = () => {
  const { washroomId } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [currStatus, setCurrStatus] = useState<StatusType>("Available");
  const [washroomData, setWashroomData] = useState<WashroomType>();
  const [isJanitorVerified, setIsJanitorVerified] = useState<boolean>(false);

  const fetchWashroomDetail = async () => {
    setIsLoading(true);
    try {
      const response = await ApiHelper.get(`/washroom-detail/${washroomId}`);
      const { data } = (response as AxiosResponse).data;
      setWashroomData(data);
      setCurrStatus(data.status);
    } catch (error) {
      console.error("Error fetching washroom details:", error);
      setError(true);
    }
    setIsLoading(false);
  };

  const handleOnStatusChange = async (actionName: string) => {
    setIsStatusUpdating(true);
    try {
      if (currStatus === STATUS_CONSTANT.cleaning && !isJanitorVerified) {
        toast.error("Verify yourself in order to change the status");
        setIsStatusUpdating(false);
        return;
      }
      const newStatusData = {
        status: actionName,
        janitorEmail: localStorage.getItem("janitorEmail") ?? null,
      };

      const response = await ApiHelper.post(
        `/update-washroom-status/${washroomId}`,
        newStatusData
      );

      const { data } = (response as AxiosResponse).data;

      setWashroomData(data);
      setCurrStatus(actionName as StatusType);
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Error in updating status. Please try again.");
    }
    setIsStatusUpdating(false);
  };

  useEffect(() => {
    fetchWashroomDetail();
  }, []);

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="mr-2 h-10 w-10 animate-spin" />
        Loading...
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="bg-gray-100 h-screen p-10">
        <div
          className={`relative flex flex-col h-full rounded-lg shadow-lg p-6 ${statusClasses[currStatus]}`}
        >
          <div className="absolute right-6">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger>
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className={`${janitorButtonClasses[currStatus]} py-5 border-2 hover:bg-transparent`}
                >
                  Janitor?
                </Button>
              </DialogTrigger>
              <DialogContent className="p-10">
                {isJanitorVerified ? (
                  isStatusUpdating ? (
                    <div className="flex justify-center items-center">
                      <Loader2 className="mr-2 h-10 w-10 animate-spin" />
                    </div>
                  ) : (
                    <>
                      <DialogHeader>
                        <DialogTitle className="text-center">
                          Choose an action
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-3 flex justify-center items-center gap-4">
                        <div
                          onClick={() => handleOnStatusChange("Cleaning")}
                          className="border-2 border-black rounded-xl p-6 cursor-pointer hover:bg-black hover:text-white"
                        >
                          <MdOutlineCleaningServices size={50} />
                        </div>
                        <div
                          onClick={() => handleOnStatusChange("Announcement")}
                          className="border-2 border-black rounded-xl p-6 cursor-pointer hover:bg-black hover:text-white"
                        >
                          <GrAnnounce size={50} />
                        </div>
                      </div>
                    </>
                  )
                ) : (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        Enter your access information
                      </DialogTitle>
                    </DialogHeader>
                    <VerifyJanitorForm verifyJanitor={setIsJanitorVerified} />
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>
          <h1 className="grow text-4xl font-bold italic text-center">
            Occupancy Status Screen
          </h1>
          <div className="text-center text-2xl font-semibold underline">
            {washroomData?.name}
          </div>
          <div className="grow flex items-center justify-center">
            {renderIconBasedOnStatus(currStatus)}
          </div>
          <div className="mx-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className={`bg-transparent px-10 text-lg font-semibold ${statusDropdownClasses[currStatus]} hover:text-white rounded-full border-2 focus-visible:ring-0 focus-visible:ring-offset-0`}
                >
                  {washroomData?.status}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={currStatus}
                  onValueChange={handleOnStatusChange}
                >
                  <DropdownMenuRadioItem value={STATUS_CONSTANT.available}>
                    {currStatus === STATUS_CONSTANT.available
                      ? STATUS_CONSTANT.available
                      : "Cleaning Completed"}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={STATUS_CONSTANT.occupied}>
                    {STATUS_CONSTANT.occupied}
                  </DropdownMenuRadioItem>
                  {isJanitorVerified && (
                    <>
                      <DropdownMenuRadioItem value={STATUS_CONSTANT.cleaning}>
                        {STATUS_CONSTANT.cleaning} in Progress
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem
                        value={STATUS_CONSTANT.announcement}
                      >
                        {STATUS_CONSTANT.announcement}
                      </DropdownMenuRadioItem>
                    </>
                  )}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
