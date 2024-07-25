import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, PlusCircleIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ApiHelper from "@/utils/apiHelper";
import toast from "react-hot-toast";
import { WashroomType } from "@/utils/types";
import { AxiosResponse } from "axios";

const AddWashroomDialog = ({
  updateWashroomsList,
}: {
  updateWashroomsList: (newWashroom: WashroomType) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    const washroomData = {
      name,
      status,
    };
    try {
      const response = await ApiHelper.post(
        "/admin/add-washroom",
        washroomData
      );
      const newWashroom: WashroomType = (response as AxiosResponse).data?.data;
      updateWashroomsList(newWashroom);
      setName("");
      setStatus("");
      toast.success("Washroom added successfully!");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error submitting new washroom:", error);
      toast.error("Failed to add washroom. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircleIcon className="mr-2" /> Add Washroom
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-6 bg-white">
        <DialogHeader>
          <DialogTitle>Add New Washroom</DialogTitle>
          <DialogDescription>
            Enter the details of the new washroom.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="washroom-name" className="block mb-2">
              Name:
            </Label>
            <Input
              id="washroom-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter washroom name"
            />
          </div>
          <div>
            <Label htmlFor="washroom-status" className="block mb-2">
              Status:
            </Label>
            <Select onValueChange={(value) => setStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Occupied">Occupied</SelectItem>
                  <SelectItem value="Cleaning">Cleaning</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              <>Save Washroom</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddWashroomDialog;
