import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2 } from "lucide-react";

import ApiHelper from "@/utils/apiHelper";
import toast from "react-hot-toast";
import { AxiosResponse } from "axios";

const VerifyJanitorForm = ({
  verifyJanitor,
}: {
  verifyJanitor: Dispatch<SetStateAction<boolean>>;
}) => {
  const [janitorName, setJanitorName] = useState<string>();
  const [accessId, setAccessId] = useState<string>("");
  const [isValidating, setIsValidating] = useState<boolean>(false);

  const handleOnSubmit = async () => {
    setIsValidating(true);
    try {
      const response = await ApiHelper.post(`/admin/login`, {
        name: janitorName,
        accessId,
      });

      const { email } = (response as AxiosResponse).data;

      setJanitorName("");
      setAccessId("");

      localStorage.setItem("janitorEmail", email);
      verifyJanitor(true);
      toast.success("Verified!");

      setTimeout(() => {
        console.log("Clearing local storage");
        localStorage.clear();
        verifyJanitor(false);
      }, 1 * 60 * 1000);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Failed to log in. Please check your credentials.");
    }
    setIsValidating(false);
  };

  return (
    <div className="mx-auto mt-4 flex flex-col gap-3">
      <div>
        <Label htmlFor="name" className="mb-2">
          Janitor Name
        </Label>
        <Input
          type="text"
          id="name"
          placeholder="Enter your name"
          value={janitorName}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setJanitorName(event.target.value)
          }
        />
      </div>
      <div>
        <Label htmlFor="terms" className="mb-2">
          Enter your access id
        </Label>
        <InputOTP
          maxLength={6}
          value={accessId}
          onChange={(value) => setAccessId(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button disabled={isValidating} onClick={handleOnSubmit}>
        {isValidating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait...
          </>
        ) : (
          <>Submit</>
        )}
      </Button>
    </div>
  );
};

export default VerifyJanitorForm;
