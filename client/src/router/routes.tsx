import { createBrowserRouter } from "react-router-dom";
import Landing from "@/pages/Authentication/Landing";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <div>404</div>,
  },
  {
    path: "/restaurant/register",
    element: <div>Register</div>,
  },
  {
    path: "/restaurant/login",
    element: <div>Login</div>,
  },
  {
    path: "/organization/register",
    element: <div>Register</div>,
  },
  {
    path: "/organization/login",
    element: <div>Login</div>,
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
