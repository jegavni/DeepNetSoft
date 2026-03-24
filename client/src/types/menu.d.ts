// src/types/menu.ts
export interface MenuItemType {
  _id: string;
  category: "food" | "drinks" | "brunch";
  title: string;
  description: string;
  price: number;
}