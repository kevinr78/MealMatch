import { Input } from "@/components/Input";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useNavigationType } from "react-router-dom";
import { fetcher } from "@/lib/fetch";
import { APIResponse } from "@/lib/types";
import { toast } from "react-toastify";
import { useUserAuth } from "@/pages/store/authContext";
import { log } from "console";
export default function RestaurantLogin() {
  const { login } = useUserAuth();
  const navigate = useNavigate();
  const navType = useNavigationType();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    const response: APIResponse = await fetcher("/restaurant/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response) {
      const { token, data } = response;
      console.log(data);
      login(data, token as string);
      toast.success("Restaurant logged in successfully");
      navigate("/restaurants/dashboard");
    }
  };
  return (
    <div className="w-screen h-screen bg-amber-100 flex justify-center items-center">
      <div className="absolute top-0 left-0">
        <button
          className=" mt-2 ml-2 btn btn-warning"
          onClick={() => {
            if (navType === "POP") {
              navigate("/");
            } else {
              navigate(-1);
            }
          }}
        >
          <ArrowLeft />
        </button>
      </div>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-xl text-warning">
          Welcome back - Login
        </legend>
        <form action="" method="POST" onSubmit={handleSubmit}>
          <Input
            name="restaurant_email"
            label="Restaurant Email"
            type="email"
            placeholder="Email"
            minLength={5}
            inputclassname="validator"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            hint="Enter a valid email address"
          />
          <Input
            name="restaurant_password"
            type="password"
            inputclassname="validator"
            label="Restaurant password"
            placeholder="Password"
          />
          <button className="btn  mt-4 btn-warning" type="submit">
            Login
          </button>
        </form>
      </fieldset>
    </div>
  );
}
