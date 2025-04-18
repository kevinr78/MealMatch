import { Input } from "@/components/Input";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useNavigationType } from "react-router-dom";
export default function OrganizationLogin() {
  const navigate = useNavigate();
  const navType = useNavigationType();
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
        <Input
          name="organization_email"
          label="Org. Email"
          type="email"
          placeholder="Email"
          minLength={5}
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          hint="Enter a valid email address"
        />
        <Input
          name="organization_password"
          type="password"
          label="Org.  password"
          placeholder="Password"
        />

        <button className="btn  mt-4 btn-warning">Login</button>
      </fieldset>
    </div>
  );
}
