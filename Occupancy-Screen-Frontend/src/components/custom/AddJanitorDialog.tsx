import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, PlusCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import ApiHelper from "@/utils/apiHelper";
import { AxiosResponse } from "axios";
import { UserType } from "@/utils/types";

const AddJanitorDialog = ({
  updateJanitorsList,
}: {
  updateJanitorsList: (newJanitor: UserType) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isScreenChanging, setIsScreenChanging] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [accessId, setAccessId] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    const janitorData = {
      name,
      email,
      age,
      role: "Janitor",
    };
    try {
      const response = await ApiHelper.post("/admin/add-user", janitorData);
      const newJanitor: UserType = (response as AxiosResponse).data?.data;

      updateJanitorsList(newJanitor);
      setName("");
      setEmail("");
      setAge("");
      setAccessId((response as AxiosResponse).data?.access_id);
      toast.success("Janitor added successfully!");
      setIsScreenChanging(true);

      setTimeout(() => {
        setIsScreenChanging(false);
      }, 2 * 1000);

      setTimeout(() => {
        setIsDialogOpen(false);
        setAccessId("");
      }, 30 * 1000);
    } catch (error) {
      console.error("Error submitting new janitor:", error);
      toast.error("Failed to add janitor. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircleIcon className="mr-2" /> Add New Janitor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-6 bg-white">
        {!accessId ? (
          <>
            <DialogHeader>
              <DialogTitle>Add New Janitor</DialogTitle>
              <DialogDescription>
                Enter the details of the new janitor.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="janitor-name" className="block mb-2">
                  Name:
                </Label>
                <Input
                  id="janitor-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter janitor's name"
                />
              </div>
              <div>
                <Label htmlFor="janitor-email" className="block mb-2">
                  Email:
                </Label>
                <Input
                  id="janitor-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter janitor's email"
                />
              </div>
              <div>
                <Label htmlFor="janitor-age" className="block mb-2">
                  Age:
                </Label>
                <Input
                  id="janitor-age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter janitor's age"
                />
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
                  <>Save Janitor</>
                )}
              </Button>
            </DialogFooter>
          </>
        ) : isScreenChanging ? (
          <div className="flex justify-center items-center">
            <Loader2 className="mr-2 h-10 w-10 animate-spin" />
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Access Id</DialogTitle>
              <DialogDescription>
                Please store this Access ID in a safe place. It is generated
                only once and cannot be retrieved later.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center font-bold text-3xl">
              {accessId}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddJanitorDialog;
