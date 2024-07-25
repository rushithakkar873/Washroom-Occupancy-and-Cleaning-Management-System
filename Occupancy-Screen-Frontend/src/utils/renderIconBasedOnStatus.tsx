import { BiMaleFemale, BiBlock } from "react-icons/bi";
import { GrAnnounce } from "react-icons/gr";
import { MdOutlineCleaningServices } from "react-icons/md";
import { STATUS_CONSTANT } from "./constants"
import { StatusType } from "./types"

export const renderIconBasedOnStatus = (currStatus: StatusType) => {
    switch (currStatus) {
      case STATUS_CONSTANT.available:
        return (
          <BiMaleFemale className="h-[200px] w-[200px] md:w-[450px] md:h-[450px]" />
        );
      case STATUS_CONSTANT.occupied:
        return (
          <BiBlock className="h-[200px] w-[200px] md:w-[450px] md:h-[450px]" />
        );
      case STATUS_CONSTANT.cleaning:
        return (
          <MdOutlineCleaningServices className="h-[200px] w-[200px] md:w-[400px] md:h-[450px]" />
        );
      case STATUS_CONSTANT.announcement:
        return (
          <GrAnnounce className="h-[200px] w-[200px] md:w-[400px] md:h-[450px]" />
        );
      default:
        return <></>;
    }
  };