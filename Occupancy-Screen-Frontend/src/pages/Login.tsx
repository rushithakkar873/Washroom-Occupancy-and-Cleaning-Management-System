import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import LoginHeroImg from "../assets/LoginPageImg.png";
import { Loader2 } from "lucide-react";
import { BASE_URL } from "@/utils/constants";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [accessId, setAccessId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/admin/login`, {
        email: email,
        accessId: accessId,
      });
      toast.success("Logged in successfully!");
      localStorage.setItem("token", response.data.access_token);
      navigate("/admin/dashboard");

      setTimeout(() => {
        console.log("Clearing local storage");
        localStorage.clear();
      }, 60 * 60 * 1000);

    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Failed to log in. Please check your credentials.");
    }
    setIsLoading(false);
  };

  return (
    <div className="h-screen lg:grid lg:grid-cols-2">
      <div className="hidden lg:block">
        <img
          src={LoginHeroImg}
          alt="Login Visual"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex items-center justify-center p-12 bg-gray-100 md:min-h-screen">
        <form
          onSubmit={handleLogin}
          className="mx-auto w-full max-w-md space-y-6"
        >
          <h1 className="text-center text-3xl font-bold">Admin Login</h1>
          <p className="text-center text-gray-600">
            Enter your Email & Access Id below to login as an admin
          </p>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com"
              required
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <Label htmlFor="access-id">Access Id</Label>
            <Input
              id="access-id"
              type="password"
              value={accessId}
              onChange={(e) => setAccessId(e.target.value)}
              placeholder="Enter you access id"
              required
              className="mt-1 block w-full"
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              <>Login</>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
