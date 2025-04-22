import { X } from "lucide-react";

type DrawerProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function Drawer({ isOpen, setIsOpen }: DrawerProps) {
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-transparent  bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          " w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <header className="p-4 font-bold text-lg flex gap-2 items-center">
            <button
              role="button"
              className=" btn btn-outline btn-sm btn-warning"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <X />
            </button>
            <h1 className="text-xl text-orange-400">Cart</h1>
          </header>
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
