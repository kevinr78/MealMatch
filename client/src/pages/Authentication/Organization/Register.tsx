import { Input } from "@/components/Input";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useNavigationType } from "react-router-dom";
import { fetcher } from "@/lib/fetch";
import { APIResponse } from "@/lib/types";
import { toast } from "react-toastify";

export default function OrganizationRegister() {
  const navigate = useNavigate();
  const navType = useNavigationType();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("org_location", "something");
    const data = Object.fromEntries(formData.entries());
    const response: APIResponse = await fetcher("/organization/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response) {
      const { token } = response;
      localStorage.setItem("organization", token as string);
      toast.success("Organization registered successfully");
      navigate("/organizations");
    }
  };

  return (
    <div className="w-screen h-screen bg-amber-100">
      <div className=" flex flex-col sm:grid  sm:grid-cols-auto     grid-rows-auto gap-4">
        <div className="col-span-5">
          <header className="p-2 flex gap-2 items-center">
            <div className="">
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
            <h1 className="font-bold text-2xl">
              Tell us more about your organization
            </h1>
          </header>
          <div className="divider"></div>
        </div>
        <div className="col-span-2 row-span-1 row-start-2 ">
          <section id="restaurant-form-container">
            <form className="p-4" method="POST" onSubmit={handleSubmit}>
              <Input
                name="org_name"
                label="Organization Name"
                placeholder="Name"
                required
                minLength={2}
                hint="Must be at least 2 characters long"
              />
              <div className="grid grid-cols-2 grid-rows-2">
                <div className="col-span-2 flex  gap-2">
                  <Input
                    name="org_email"
                    label="Org. Email"
                    type="email"
                    placeholder="Email"
                    minLength={5}
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    hint="Enter a valid email address"
                  />
                  <Input
                    name="org_password"
                    type="password"
                    label="Org. password"
                    placeholder="Password"
                  />
                </div>
                <div className="col-span-2 row-start-2 flex gap-2">
                  <Input
                    name="org_contact_person"
                    label="Org. Contact Person Name"
                    type="text"
                    placeholder="Name"
                  />
                  <Input
                    name="org_contact_number"
                    type="tel"
                    inputclassname="tabular-nums validator "
                    pattern="[0-9]{10}"
                    minLength={10}
                    maxLength={10}
                    title="Must be a valid phone number"
                    label="Org. Contact Number"
                    placeholder="Phone"
                    hint={"Must be 10 digits"}
                  />
                </div>
              </div>
              <Input
                name="org_address"
                label="Org. Address"
                type="text"
                placeholder="Address"
              />
              <div className="flex gap-2">
                <Input
                  name="org_city"
                  label="City"
                  type="text"
                  placeholder="City"
                />
                <Input
                  name="org_state"
                  label="State"
                  type="text"
                  placeholder="State"
                />
                <Input
                  name="org_zip_code"
                  label="Zip Code"
                  type="number"
                  placeholder="Zip Code"
                />
              </div>
              <div className=" flex justify-end mt-4 gap-2">
                <button type="reset" className="btn btn-outline btn-warning">
                  Clear
                </button>
                <button type="submit" className="btn btn-warning">
                  Submit
                </button>
              </div>
            </form>
          </section>
        </div>
        <div className="divider divider-horizontal col-span-1"></div>
        <div className="col-span-2 row-span-1 col-start-4 row-start-2 h-96 bg-amber-500  sm:max-w-md overflow-y-auto">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
          exercitationem voluptatibus similique? Facere, debitis fuga, maiores
          amet laborum vel odit inventore, dolorum eum laudantium optio
          expedita. Obcaecati quos facilis magnam quis. Repellat voluptatem
          voluptatum minima fugit rem, nulla eaque at porro nam, harum,
          distinctio error! Maxime, error beatae in culpa voluptates nulla
          voluptas nostrum, quis, ducimus suscipit praesentium incidunt repellat
          reprehenderit voluptatibus rem? Dolorem quis quas ducimus, atque
          consequuntur nobis nostrum. Dolor dolorum quaerat nihil ea repellat
          consequuntur placeat? Necessitatibus delectus, ad et impedit quas
          dolores veritatis deleniti animi quidem vitae nemo cum culpa
        </div>
      </div>
    </div>
  );
}
