import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import CustomBreadcrumb from "@/components/custom/CustomBreadcrumb";
import AddJanitorDialog from "@/components/custom/AddJanitorDialog";
import { DeleteIcon, EditIcon, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import ApiHelper from "@/utils/apiHelper";
import { AxiosResponse } from "axios";
import { UserType } from "@/utils/types";
import CustomPagination from "@/components/custom/CustomPagination";

const itemsPerPage = 7;

const AdminJanitorsList = () => {
  const [janitors, setJanitors] = useState<Array<UserType>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = janitors ? Math.ceil(janitors.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = janitors?.slice(startIndex, endIndex);

  const fetchJanitors = async () => {
    setIsLoading(true);
    try {
      const response = await ApiHelper.get("/admin/get-janitors-list");
      const { data } = (response as AxiosResponse).data;
      setJanitors(data);
    } catch (error) {
      console.error("Error fetching janitors:", error);
      setError(true);
    }
    setIsLoading(false);
  };

  const updateJanitorsList = (newJanitor: UserType) => {
    setJanitors((prevJanitors) => [...prevJanitors, newJanitor]);
  };

  useEffect(() => {
    fetchJanitors();
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
          <CustomBreadcrumb currPage="Janitors List" />
          <div className="">
            <AddJanitorDialog updateJanitorsList={updateJanitorsList} />
          </div>
        </div>
        <Card className="grow flex flex-col">
          <div className="grow">
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center text-xs font-bold uppercase">
                    No
                  </TableHead>
                  <TableHead className="text-left text-xs font-bold uppercase">
                    Name
                  </TableHead>
                  <TableHead className="text-left text-xs font-bold uppercase">
                    Email
                  </TableHead>
                  <TableHead className="text-center text-xs font-bold uppercase">
                    Age
                  </TableHead>
                  <TableHead className="text-center text-xs font-bold uppercase">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems?.map((janitor, index) => (
                  <TableRow key={index} className="text-center">
                    <TableCell className="w-1/6">
                      {startIndex + index + 1}
                    </TableCell>
                    <TableCell className="text-left w-1/5">
                      {janitor.name}
                    </TableCell>
                    <TableCell className="text-left w-1/5">
                      {janitor.email}
                    </TableCell>
                    <TableCell className="w-1/5">{janitor.age}</TableCell>
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

export default AdminJanitorsList;
