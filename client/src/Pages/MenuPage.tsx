import  { useState, useEffect, useRef } from "react";
import { Modal } from "../Components/Modal";
import { PopupForm } from "../Components/createMenu";

// Types
interface Menu {
  _id: string;
  name: string;
  description?: string;
  parentId: string | null;
}

export const MenuPage = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null); // 👈 NEW
  const [activeParentId, setActiveParentId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  // Fetch menus
  const fetchMenus = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/menus`);
      const data: Menu[] = await res.json();
      setMenus(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // Click outside → collapse
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.closest("button")) return;
      if (target.closest(".modal-content")) return;

      if (menuRef.current && !menuRef.current.contains(target)) {
        setExpandedMenus({});
        setSelectedCategoryId(null);
        setSelectedMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle expand
  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Categories
  const categories = menus.filter(menu => !menu.parentId);

  //  Recursive Menu Renderer
  const renderMenus = (parentId: string | null, level = 0) => {
    return menus
      .filter(menu => menu.parentId === parentId)
      .map(menu => (
        <div key={menu._id} className="mb-2">

          <div
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-2 rounded hover:bg-gray-800 ${
              level > 0 ? "pl-4 sm:pl-6 border-l border-gray-700" : ""
            }`}
          >
            {/* LEFT SIDE */}
            <div className="flex items-center gap-2">

              {/* 🔽 Arrow (ONLY expand) */}
              <span
                className="text-xs cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu(menu._id);
                }}
              >
                {expandedMenus[menu._id] ? "▼" : "▶"}
              </span>

              {/*  Name (ONLY show description) */}
              <span
                className="font-semibold text-sm sm:text-base cursor-pointer hover:text-yellow-400"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMenu(menu);
                }}
              >
                {menu.name}
              </span>
            </div>

            {/* ➕ Add Submenu */}
            <button
              className="text-yellow-400 text-xs sm:text-sm"
              onClick={(e) => {
                e.stopPropagation();
                setActiveParentId(menu._id);
                setIsModalOpen(true);
              }}
            >
              + Add
            </button>
          </div>

          {/* CHILDREN */}
          {expandedMenus[menu._id] && (
            <div className="ml-2 sm:ml-4">
              {renderMenus(menu._id, level + 1)}
            </div>
          )}
        </div>
      ));
  };

  return (
    <div className="bg-black text-white ">

      {/*  HEADER */}
      <div className="bg-gray-900 py-8 text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-red-500">MENU</h1>
        <p className="text-gray-400 mt-2">Explore our food, drinks and brunch</p>

        {/* Categories */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {categories.map(cat => (
            <button
              key={cat._id}
              onClick={() => {
                setSelectedCategoryId(cat._id);
                setSelectedMenu(null);
              }}
              className={`px-4 py-2 rounded border ${
                selectedCategoryId === cat._id
                  ? "bg-yellow-500 text-black"
                  : "border-gray-500"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/*  CONTENT */}
      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* Add Menu */}
        {selectedCategoryId && (
          <button
            className="mb-4 bg-yellow-500 text-black px-4 py-2 rounded"
            onClick={() => {
              setActiveParentId(selectedCategoryId);
              setIsModalOpen(true);
            }}
          >
            + Add Menu
          </button>
        )}

        {/* Layout */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* LEFT: MENU TREE */}
          <div ref={menuRef}>
            {selectedCategoryId ? (
              renderMenus(selectedCategoryId)
            ) : (
              <p className="text-gray-400">Select a category</p>
            )}
          </div>

          {/* RIGHT: DESCRIPTION */}
          <div>
            {selectedMenu ? (
              <div className="p-4 border border-yellow-500 rounded bg-gray-900">
                <h2 className="text-xl font-bold text-yellow-400">
                  {selectedMenu.name}
                </h2>
                <p className="text-gray-300 mt-2">
                  {selectedMenu.description || "No description available"}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">
                Click a menu item to see details
              </p>
            )}
          </div>

        </div>
      </div>

      {/*  c  MODAL */}
      {isModalOpen && activeParentId && (
        <Modal isOpen={true} onClose={() => setIsModalOpen(false)}>
          <PopupForm
            category={
              menus.find(m => m._id === activeParentId)?.name || "Menu"
            }
            parentId={activeParentId}
            isOpen={true}
            onClose={() => setIsModalOpen(false)}
            refreshMenus={() => {
              fetchMenus();

              if (activeParentId) {
                setExpandedMenus(prev => ({
                  ...prev,
                  [activeParentId]: true,
                }));
              }

              setIsModalOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
};