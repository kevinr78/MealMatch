import { useNavigate } from "react-router-dom";
import RestaurantAuthGraphic from "@/assets/restaurant_auth_graphic.svg";
import OrganizationAuthGraphic from "@/assets/organization_auth_graphic.svg";
export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-12 grid-rows-6 gap-4">
      <div className="col-span-12 row-span-2 p-2">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-orange-600">
            Welcome to MealMatch
          </h1>
          <p className="mt-2 text-lg text-orange-400">
            Your one-stop solution for all needs.
          </p>
        </div>
      </div>
      <div className="col-span-12 row-span-4 row-start-3 flex flex-col items-center justify-center gap-4  md:flex-row ">
        <div
          className="card bg-base-100 w-96 shadow-xl"
          id="restaurant-auth-card"
        >
          <figure className="px-6 pt-6">
            <img
              src={RestaurantAuthGraphic}
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Restaurant</h2>

            <div className="card-actions">
              <button
                className="btn bg-orange-400"
                onClick={() => {
                  navigate("/restaurant/login");
                }}
              >
                Log In{" "}
              </button>
              <button
                className="btn bg-yellow-300"
                onClick={() => {
                  navigate("/restaurant/register");
                }}
              >
                Register
              </button>
            </div>
          </div>
        </div>
        <div
          className="card bg-base-100 w-96 shadow-xl"
          id="restaurant-auth-card"
        >
          <figure className="px-6 pt-6">
            <img
              src={OrganizationAuthGraphic}
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Organization</h2>

            <div className="card-actions">
              <button
                className="btn bg-orange-400"
                onClick={() => {
                  navigate("/organization/login");
                }}
              >
                {" "}
                Log In{" "}
              </button>
              <button
                className="btn bg-yellow-300"
                onClick={() => {
                  navigate("/organization/login");
                }}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
