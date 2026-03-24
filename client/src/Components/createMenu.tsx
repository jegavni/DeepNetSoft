import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Menu {
  _id: string;
  name: string;
}

interface FormData {
  name: string;
  description?: string;
  parentId?: string;
}

interface PopupFormProps {
  category: string;
  parentId?: string;
  isOpen: boolean;
  onClose: () => void;
  refreshMenus: () => void;
}

export const PopupForm = ({ category, parentId, isOpen, onClose, refreshMenus }: PopupFormProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: { parentId }
  });

  const [submenus, setSubmenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch submenus for the selected parent
  useEffect(() => {
    const fetchSubmenus = async () => {
      if (!parentId) return;
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/menus?parentId=${parentId}`);
        const data: Menu[] = await res.json();
        setSubmenus(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubmenus();
  }, [parentId]);

  const onSubmit = async (data: FormData) => {
  setLoading(true);

  const payload = {
    name: data.name,
    description: data.description,
    parentId: parentId, // 👈 ALWAYS from props (safe)
  };

  console.log("Sending payload:", payload); // ✅ DEBUG

  try {
    await fetch("http://localhost:5000/api/menus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    reset();
    refreshMenus();

    // refresh submenu dropdown
    const res = await fetch(`http://localhost:5000/api/menus?parentId=${parentId}`);
    setSubmenus(await res.json());

  } catch (err) {
    console.error(err);
    alert("Failed to create submenu");
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-3 text-yellow-400">{category} Submenu</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <input
          {...register("name", { required: "Submenu name is required" })}
          placeholder="Submenu Name"
          className={`w-full p-2 mb-2 bg-black border rounded ${errors.name ? "border-red-500" : "border-gray-600"}`}
        />
        {errors.name && <p className="text-red-500 mb-2">{errors.name.message}</p>}

        <input
          {...register("description", { maxLength: { value: 100, message: "Max 100 chars" } })}
          placeholder="Description"
          className={`w-full p-2 mb-2 bg-black border rounded ${errors.description ? "border-red-500" : "border-gray-600"}`}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 mb-3 rounded font-semibold ${loading ? "bg-gray-600" : "bg-yellow-500 text-black"}`}
        >
          {loading ? "Adding..." : "Add Submenu"}
        </button>
      </form>

     
    </div>
  );
};


