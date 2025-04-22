import React, { useState } from "react";
import Navbar from "./Navbar";
import Drawer from "./Drawer";
import Sidebar from "./Sidebar";
export default function BaseLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-5  grid-rows-[auto_1fr]  h-screen">
          <div className="col-span-5 row-auto">
            <Navbar onCartClick={toggleDrawer} />
          </div>
          <div className=" col-span-1 row-span-4 row-start-2 ">
            <Sidebar />
          </div>
          <div className="col-span-4 row-start-2 row-span-4 "></div>
        </div>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}></Drawer>
      </div>
    </>
  );
}
