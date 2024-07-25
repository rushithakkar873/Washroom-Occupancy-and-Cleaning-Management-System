export const STATUS_CONSTANT = {
  available: "Available",
  occupied: "Occupied",
  cleaning: "Cleaning",
  announcement: "Announcement",
};

export const { VITE_API_URL: BASE_URL } = import.meta.env;

export const StatusCellBgColorClasses = {
  Available: "bg-[#d4edbc] text-green-800 hover:bg-green-400",
  Occupied: "bg-[#ffcfc9] text-red-800 hover:bg-red-400",
  Cleaning: "bg-[#ffe5a0] text-yellow-800 hover:bg-yellow-400",
  Announcement: "bg-[#bfe1f6] text-blue-800 hover:bg-blue-400",
};