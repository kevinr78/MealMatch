import { X, LayoutDashboard, ListOrdered, NotebookTabs } from "lucide-react";

export default function () {
  return (
    <aside className="h-full bg-amber-200">
      <div className="flex flex-col  h-full  ">
        <header className="p-4 font-bold text-lg flex gap-2 items-center place-content-start">
          <button className="btn btn-xs btn-warning">
            <X />
          </button>
        </header>
        <nav className="flex-1 overflow-y-auto place-items-start">
          <ul className="menu menu-md w-full   rounded-box  gap-2">
            <li className="">
              <a>
                <NotebookTabs />
                <span className="hidden sm:block ">Listings</span>
              </a>
            </li>
            <li>
              <a>
                <LayoutDashboard />
                <span className="invisible sm:visible  ">DashBoard</span>
              </a>
            </li>
            <li>
              <a>
                <ListOrdered />
                <span className="invisible sm:visible  ">Orders</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
