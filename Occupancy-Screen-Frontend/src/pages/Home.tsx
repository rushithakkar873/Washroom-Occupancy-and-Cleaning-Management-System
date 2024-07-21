// State imports
import { useState } from "react";
import toast from "react-hot-toast";

// React-Icons imports
import { BiMaleFemale, BiBlock } from "react-icons/bi";
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
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Utils imports
import { STATUS_CONSTANT } from "@/utils/constants";
import { StatusType } from "@/utils/types";

// const washrooms = [
//   { id: 1, name: "Washroom 1", status: "Available" },
//   { id: 2, name: "Washroom 2", status: "Occupied" },
//   { id: 3, name: "Washroom 3", status: "Available" },
//   { id: 4, name: "Washroom 4", status: "Occupied" },
// ];

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accessId, setAccessId] = useState<string>("");
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [currStatus, setCurrStatus] = useState<StatusType>("Available");

  const renderIconBasedOnStatus = (currStatus: StatusType) => {
    switch (currStatus) {
      case STATUS_CONSTANT.available:
        return <BiMaleFemale size={500} />;
      case STATUS_CONSTANT.occupied:
        return <BiBlock size={500} />;
      case STATUS_CONSTANT.cleaning:
        return <MdOutlineCleaningServices size={500} />;
      case STATUS_CONSTANT.announcement:
        return <GrAnnounce size={400} />;
      default:
        return <></>;
    }
  };

  const handleOnSubmit = () => {
    if (accessId === "") {
      toast.error("Please enter the value");
    } else {
      setIsLoading(true);
      console.log(accessId);
      setAccessId("");
      setTimeout(() => {
        setIsLoading(false);
        setIsValidated(true);
      }, 5000);
    }
  };

  const handleOnActionClick = (actionName: string) => {
    console.log(actionName);
    setCurrStatus(actionName as StatusType);
    setIsValidated(false);
  };

  return (
    <>
      <div className="bg-gray-100 h-screen p-10">
        <div
          className={`relative flex flex-col h-full rounded-lg shadow-lg p-6 ${statusClasses[currStatus]}`}
        >
          <div className="absolute right-6">
            <Dialog>
              <DialogTrigger>
                <Button
                  className={`${janitorButtonClasses[currStatus]} py-5 border-2 hover:bg-transparent`}
                >
                  Janitor?
                </Button>
              </DialogTrigger>
              <DialogContent className="p-10">
                {isValidated ? (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        Choose an action
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-3 flex justify-center items-center gap-4">
                      <div
                        onClick={() => handleOnActionClick("Cleaning")}
                        className="border-2 border-black rounded-xl p-6 cursor-pointer hover:bg-black hover:text-white"
                      >
                        <MdOutlineCleaningServices size={50} />
                      </div>
                      <div
                        onClick={() => handleOnActionClick("Announcement")}
                        className="border-2 border-black rounded-xl p-6 cursor-pointer hover:bg-black hover:text-white"
                      >
                        <GrAnnounce size={50} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        Enter your access id
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mx-auto mt-4 flex flex-col gap-3">
                      <InputOTP
                        maxLength={6}
                        value={accessId}
                        onChange={(value) => setAccessId(value)}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                      <Button disabled={isLoading} onClick={handleOnSubmit}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait...
                          </>
                        ) : (
                          <>Submit</>
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>
          <h1 className="grow text-4xl font-bold text-center">
            Washroom Occupancy Status
          </h1>
          <div className="grow flex items-center justify-center">
            {renderIconBasedOnStatus(currStatus)}
          </div>
          <div className="mx-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className={`bg-transparent px-10 text-lg font-bold ${statusDropdownClasses[currStatus]} hover:text-white rounded-full border-2 focus-visible:ring-0 focus-visible:ring-offset-0`}
                >
                  {currStatus}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={currStatus}
                  onValueChange={handleOnActionClick}
                >
                  <DropdownMenuRadioItem value={STATUS_CONSTANT.available}>
                    {STATUS_CONSTANT.available}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={STATUS_CONSTANT.occupied}>
                    {STATUS_CONSTANT.occupied}
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-4 mx-auto">
            <p className="text-sm text-gray-500">Updated a few seconds ago</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
