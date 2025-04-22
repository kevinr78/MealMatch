import React from "react";
import { Bell, ShoppingCart, CircleUserRound } from "lucide-react";

interface NavbarProps {
  onCartClick: () => void;
}

export default function Navbar({ onCartClick }: NavbarProps) {
  return (
    <div className="navbar bg-base-100 shadow-sm ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-warning">MealMatch</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <Bell className="text-warning" />
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end" onClick={onCartClick}>
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <ShoppingCart className="text-warning" />
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="rounded-full">
              <CircleUserRound className="text-warning" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-warning rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
