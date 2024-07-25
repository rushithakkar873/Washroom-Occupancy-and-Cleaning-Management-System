import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ActivityLogType } from "@/utils/types";
import { useState } from "react";
import CustomPagination from "./CustomPagination";

const itemsPerPage = 9;

const ActivityLogTable = ({
  activityLogs,
}: {
  activityLogs: Array<ActivityLogType>;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(activityLogs.length / itemsPerPage);

  // Calculate the range of posts for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = activityLogs.slice(startIndex, endIndex);

  if (activityLogs?.length === 0)
    return (
      <div className="h-full flex justify-center items-center font-medium text-lg text-gray-600">
        No activity logs found!!
      </div>
    );

  return (
    <div className="h-full flex flex-col">
      <div className="grow">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-xs font-bold uppercase">
                Washroom
              </TableHead>
              <TableHead className="text-center text-xs font-bold uppercase">
                Activity
              </TableHead>
              <TableHead className="text-center text-xs font-bold uppercase">
                Time
              </TableHead>
              <TableHead className="text-center text-xs font-bold uppercase">
                Date
              </TableHead>
              <TableHead className="text-center text-xs font-bold uppercase">
                Janitor
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems?.map((activity, index) => (
              <TableRow key={index} className="text-center">
                <TableCell className="font-semibold w-1/5">
                  {activity.washroom?.name}
                </TableCell>
                <TableCell className="w-1/4 capitalize">
                  {activity.action}
                </TableCell>
                <TableCell className="w-1/6">
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </TableCell>
                <TableCell className="w-1/6">
                  {new Date(activity.timestamp).toLocaleDateString()}
                </TableCell>
                <TableCell className="w-1/5">
                  {activity.user?.name ?? "NA"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="p-4">
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ActivityLogTable;
