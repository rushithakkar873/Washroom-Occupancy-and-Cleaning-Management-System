import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChartComponent from "../../components/custom/ChartComponent";
import ActivityLogTable from "@/components/custom/ActivityLogTable";
import CustomBreadcrumb from "@/components/custom/CustomBreadcrumb";
import { useEffect, useState } from "react";
import ApiHelper from "@/utils/apiHelper";
import { AxiosResponse } from "axios";
import { Loader2 } from "lucide-react";
import { getTotalTodayActivities } from "@/utils/getTotalTodayActivities";
import { ActivityLogType } from "@/utils/types";

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [activityLogs, setActivityLogs] = useState<Array<ActivityLogType>>([]);

  const fetchActivityLogs = async () => {
    setIsLoading(true);
    try {
      const response = await ApiHelper.get("/admin/get-activity-logs");
      const { data } = (response as AxiosResponse).data;
      const sortedData = (data ?? []).sort(
        (a: { timestamp: string }, b: { timestamp: string }) => {
          return (
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
        }
      );
      setActivityLogs(sortedData);
    } catch (error) {
      console.error("Error fetching activity logs:", error);
      setError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchActivityLogs();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-full flex flex-col gap-4 p-8 overflow-auto">
      <CustomBreadcrumb currPage="Dashboard" />
      <div className="grow grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="mr-2 h-10 w-10 animate-spin" />
              Loading...
            </div>
          ) : (
            <ActivityLogTable activityLogs={activityLogs as []} />
          )}
        </Card>

        <div className="grid grid-rows-2 gap-6">
          <Card className="flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="text-center text-gray-400 font-medium">
                Activities Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-6xl font-bold text-center">
                {getTotalTodayActivities(activityLogs)}
              </p>
            </CardContent>
          </Card>

          <div className="">
            <ChartComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
