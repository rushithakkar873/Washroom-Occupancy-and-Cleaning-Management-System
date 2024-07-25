import { ActivityAction } from "./enums";

export type StatusType = "Available" | "Occupied" | "Cleaning" | "Announcement";

export type UserType = {
  id: string;
  name: string;
  email: string;
  age: string;
  accessId: string;
  role: "Admin" | "Janitor";
};

export type WashroomType = {
  id: string;
  name: string;
  status: string;
};

export type ActivityLogType = {
  id: string;
  timestamp: Date;
  user: UserType;
  washroom: WashroomType;
  action: ActivityAction;
};
