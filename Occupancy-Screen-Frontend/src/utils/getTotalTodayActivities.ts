import { ActivityLogType } from "./types";

export const getTotalTodayActivities = (activities: Array<ActivityLogType>) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time part to compare only dates

  const totalToday = activities.filter((activity: ActivityLogType) => {
    const activityDate = new Date(activity.timestamp);
    activityDate.setHours(0, 0, 0, 0); // Reset time part to compare only dates
    return activityDate.getTime() === today.getTime();
  }).length;

  return totalToday;
};
