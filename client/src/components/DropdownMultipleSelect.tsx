import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
const categories = [
  "Vegetarian",
  "Non-Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Nut-Free",
  "Organic",
  "Local",
  "Imported",
  "Frozen",
  "Fresh",
  "Canned",
  "Packaged",
  "Beverages",
  "Condiments",
  "Snacks",
  "Desserts",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Appetizers",
  "Main Course",
  "Side Dishes",
  "Salads",
  "Soups",
  "Other",
];

type DropdownMultipleSelectProps = {
  setListingCategories: React.Dispatch<React.SetStateAction<string[]>>;
  listingCategories: string[];
};

export default function DropdownMultipleSelect({
  setListingCategories,
  listingCategories,
}: DropdownMultipleSelectProps) {
  const toggleCategory = (category: string) => {
    setListingCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="label text-sm font-semibold">Item Categories</label>
      <div className="dropdown w-full">
        <div tabIndex={0} role="button" className="btn w-full justify-between ">
          {listingCategories.length > 0
            ? listingCategories.join(", ")
            : "Select categories"}
          <ChevronDown className="ml-2" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full max-h-64 overflow-y-auto"
        >
          {categories.map((category) => (
            <li key={category}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="listing_categories"
                  className="checkbox checkbox-warning"
                  checked={listingCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                />
                <span className="text-sm">{category}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
