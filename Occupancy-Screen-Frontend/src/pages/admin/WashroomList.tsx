import CustomBreadcrumb from "@/components/custom/CustomBreadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AddWashroomDialog from "@/components/custom/AddWashroomDialog";
import { EditIcon, DeleteIcon, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import ApiHelper from "@/utils/apiHelper";
import { AxiosResponse } from "axios";
import { StatusType, WashroomType } from "@/utils/types";
import CustomPagination from "@/components/custom/CustomPagination";
import { StatusCellBgColorClasses } from "@/utils/constants";
import { Badge } from "@/components/ui/badge";

const itemsPerPage = 7;

const AdminWashroomList = () => {
  const [washrooms, setWashrooms] = useState<Array<WashroomType>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = washrooms ? Math.ceil(washrooms.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = washrooms?.slice(startIndex, endIndex);

  const fetchWashrooms = async () => {
    setIsLoading(true);
    try {
      const response = await ApiHelper.get("/admin/get-washrooms-list");
      const { data } = (response as AxiosResponse).data;
      setWashrooms(data);
    } catch (error) {
      console.error("Error fetching washrooms:", error);
      setError(true);
    }
    setIsLoading(false);
  };

  const updateWashroomsList = (newWashroom: WashroomType) => {
    setWashrooms((prevWashrooms) => [...prevWashrooms, newWashroom]);
  };

  useEffect(() => {
    fetchWashrooms();
  }, []);

  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="mr-2 h-10 w-10 animate-spin" />
        Loading...
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container h-full mx-auto px-4 sm:px-8">
      <div className="h-full py-8 flex flex-col">
        <div className="flex flex-row mb-1 sm:mb-4 justify-between items-center w-full">
          <CustomBreadcrumb currPage="Washrooms List" />
          <div className="">
            <AddWashroomDialog updateWashroomsList={updateWashroomsList} />
          </div>
        </div>
        <Card className="grow flex flex-col">
          <div className="grow">
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center text-xs font-bold uppercase">
                    Washroom
                  </TableHead>
                  <TableHead className="text-left text-xs font-bold uppercase">
                    Name
                  </TableHead>
                  <TableHead className="text-center text-xs font-bold uppercase">
                    Status
                  </TableHead>
                  <TableHead className="text-center text-xs font-bold uppercase">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((washroom, index) => (
                  <TableRow key={index} className="text-center">
                    <TableCell className="w-[200px]">
                      {startIndex + index + 1}
                    </TableCell>
                    <TableCell className="text-left">{washroom.name}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={`${
                          StatusCellBgColorClasses[
                            washroom.status as StatusType
                          ]
                        }`}
                      >
                        {washroom.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex justify-center gap-2">
                      <Button variant={"outline"} size={"icon"} className="">
                        <EditIcon />
                      </Button>
                      <Button variant={"outline"} size={"icon"} className="">
                        <DeleteIcon />
                      </Button>
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
        </Card>
      </div>
    </div>
  );
};

export default AdminWashroomList;
