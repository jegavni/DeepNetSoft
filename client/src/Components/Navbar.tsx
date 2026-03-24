import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-black/80 backdrop-blur-md w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 py-4 text-white">

        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-bold tracking-wide">
          DEEP<span className="text-yellow-500">NETSOFT</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-sm font-semibold">
          <li className="hover:text-yellow-500 cursor-pointer">HOME</li>
          <li className="text-yellow-500 cursor-pointer">MENU</li>
          <li className="hover:text-yellow-500 cursor-pointer">
            RESERVATION
          </li>
          <li className="hover:text-yellow-500 cursor-pointer">
            CONTACT
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-gray-700 px-6 pb-4">
          <ul className="flex flex-col gap-4 text-sm font-semibold">
            <li className="hover:text-yellow-500 cursor-pointer">HOME</li>
            <li className="text-yellow-500 cursor-pointer">MENU</li>
            <li className="hover:text-yellow-500 cursor-pointer">
              RESERVATION
            </li>
            <li className="hover:text-yellow-500 cursor-pointer">
              CONTACT
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;