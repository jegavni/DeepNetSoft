// src/components/MenuSection.tsx
import type { MenuItemType } from "../types/menu";
import MenuItem from "./MenuItem";

interface Props {
  title: string;
  items: MenuItemType[];
}

const MenuSection = ({ title, items }: Props) => {
  return (
    <div className="max-w-3xl mx-auto my-10">
      <h2 className="text-3xl font-bold mb-6 text-red-500">{title}</h2>
      {items.map((item) => (
        <MenuItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default MenuSection;