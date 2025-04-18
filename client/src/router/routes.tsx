import { createBrowserRouter } from "react-router-dom";
import Landing from "@/pages/Authentication/Landing";
import RestaurantRegister from "@/pages/Authentication/Restaurant/Register";
import RestaurantLogin from "@/pages/Authentication/Restaurant/Login";
import OrganizationRegister from "@/pages/Authentication/Organization/Register";
import OrganizationLogin from "@/pages/Authentication/Organization/Login";

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
    element: <div>Restaurants</div>,
    errorElement: <div>404</div>,
    children: [
      {
        path: "dashboard", // ✅ relative, not /dashboard
        element: <div>Dashboard</div>,
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
