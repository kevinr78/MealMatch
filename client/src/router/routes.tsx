import { createBrowserRouter } from "react-router-dom";
import Landing from "@/pages/Authentication/Landing";
import RestaurantRegister from "@/pages/Authentication/Restaurant/Register";
import RestaurantLogin from "@/pages/Authentication/Restaurant/Login";
import OrganizationRegister from "@/pages/Authentication/Organization/Register";
import OrganizationLogin from "@/pages/Authentication/Organization/Login";
import ListingForm from "@/pages/Listing/ListingForm";
import { listingLoader, getListingById } from "@/lib/listing";
import Listings from "@/pages/Listing/Listings";
import BaseLayout from "@/components/BaseLayout";

import Listing from "@/pages/Listing/Listing";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <div>404</div>,
  },
  {
    path: "/restaurant/register",
    element: <RestaurantRegister />,
  },
  {
    path: "/restaurant/login",
    element: <RestaurantLogin />,
  },
  {
    path: "/organization/register",
    element: <OrganizationRegister />,
  },
  {
    path: "/organization/login",
    element: <OrganizationLogin />,
  },

  {
    path: "/restaurants",
    element: <BaseLayout />,
    errorElement: <div>404</div>,
    children: [
      {
        path: "dashboard", // ✅ relative, not /dashboard
        element: <div>Dashboard</div>,
      },
      {
        path: "listings",
        loader: async () => {
          return await listingLoader();
        },
        element: <Listings />,
      },

      {
        path: "listings/create",
        element: <ListingForm />,
      },
      {
        path: "listing/:id",
        element: <Listing />,
        loader: async ({ params }) => {
          const { id } = params; // Extract the `id` from the route parameters.
          if (!id) {
            throw new Error("Listing ID is required");
          }
          return await getListingById(id); // Pass the `id` to the function.
        },
      },
    ],
  },
  {
    path: "/organizations",
    element: <div>Organizations</div>,
    errorElement: <div>404</div>,
    children: [
      {
        path: "dashboard", // ✅ relative
        element: <div>Dashboard</div>,
      },
    ],
  },
]);
