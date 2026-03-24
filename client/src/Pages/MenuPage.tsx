import  { useState, useEffect,useRef } from "react";
import { Modal } from "../Components/Modal";
import { PopupForm } from "../Components/createMenu";

// Types
interface Menu {
  _id: string;
  name: string;
  parentId: string | null;
}

export const MenuPage = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [activeParentId, setActiveParentId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
const menuRef = useRef<HTMLDivElement | null>(null);
  // Fetch menus
  const fetchMenus = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/menus");
      const data: Menu[] = await res.json();
      setMenus(data);
    } catch (err) {
      console.error(err);
    }
  };

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    // ✅ Ignore button clicks (Add / Submenu)
    if (target.closest("button")) return;

    // ✅ Ignore modal clicks
    if (target.closest(".modal-content")) return;

    if (menuRef.current && !menuRef.current.contains(target)) {
      setExpandedMenus({});
      setSelectedCategoryId(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  useEffect(() => {
    fetchMenus();
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

  // 🔥 Recursive renderer (Tailwind only)
  const renderMenus = (parentId: string | null, level = 0) => {
    return menus
      .filter(menu => menu.parentId === parentId)
      .map(menu => (
        <div key={menu._id} className="mb-2">

          {/* Menu Row */}
          <div
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-2 rounded hover:bg-gray-800 cursor-pointer ${
              level > 0 ? "pl-4 sm:pl-6 border-l border-gray-700" : ""
            }`}
            onClick={() => toggleMenu(menu._id)}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs">
                {expandedMenus[menu._id] ? "▼" : "▶"}
              </span>
              <span className="font-semibold text-sm sm:text-base">
                {menu.name}
              </span>
            </div>

            <button
              className="text-yellow-400 text-xs sm:text-sm self-start sm:self-auto"
              onClick={(e) => {
                e.stopPropagation();
                setActiveParentId(menu._id);
                setIsModalOpen(true);
              }}
            >
              + Add
            </button>
          </div>

          {/* Children */}
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

      {/* 🔥 HEADER */}
      <div className="bg-gray-900 py-10 text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-500">
          MENU
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Explore our food, drinks and brunch
        </p>

        {/* Categories */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {categories.map(cat => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategoryId(cat._id)}
              className={`px-4 sm:px-6 py-2 rounded border text-sm sm:text-base transition ${
                selectedCategoryId === cat._id
                  ? "bg-yellow-500 text-black"
                  : "border-gray-500 text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">

        {/* Add Menu */}
        {selectedCategoryId && (
          <div className="flex justify-center sm:justify-start mb-6">
            <button
              className="bg-yellow-500 text-black px-4 py-2 rounded text-sm sm:text-base"
              onClick={() => {
                setActiveParentId(selectedCategoryId);
                setIsModalOpen(true);
              }}
            >
              + Add Menu
            </button>
          </div>
        )}

        {/* Menu Tree */}
        {selectedCategoryId ? (
          <div ref={menuRef} className="space-y-2">
            {renderMenus(selectedCategoryId)}
          </div>
        ) : (
          <p className="text-gray-400 text-center">
            Select a category
          </p>
        )}
      </div>
      </div>

      
      

      {/* 🔥 MODAL */}
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

