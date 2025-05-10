import { Input } from "@/components/Input";
import DropdownMultipleSelect from "@/components/DropdownMultipleSelect";
import { useState } from "react";
import { uploadImage } from "@/lib/utils";
import { fetcher } from "@/lib/fetch";
import { APIResponse } from "@/lib/types";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
export default function ListingForm() {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    try {
      setUploading(true);
      const url = await toast.promise(uploadImage(file), {
        pending: "Uploading image...",
        success: "Image uploaded successfully!",
        error: "Error uploading image",
      });
      setImageURL(url as string);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.delete("listing_categories");
    formData.append("listing_item_image_url", imageURL);
    formData.append("listing_item_categories", selectedCategories.join(","));
    const data = Object.fromEntries(formData.entries());
    const response: APIResponse = await fetcher("/listings", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("restaurant_token")}`,
      },
    });

    if (response) {
      const { data } = response;
      toast.success("Listing created successfully");
      navigate("/restaurants/listings");
    }
  };
  return (
    <div className="h-full">
      <main className="">
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2  h-full"
        >
          <div className=" p-4   ">
            <Input
              name="listing_item_title"
              label="Listing Title"
              type="text"
              placeholder="Item Name"
              minLength={2}
              required={true}
              inputclassname="validator w-full"
              hint="Enter the name of the item"
            />
            <Input
              name="listing_item_description"
              label="Listing Description"
              type="textarea"
              placeholder="Item Description"
              required={true}
              inputclassname="validator"
              hint="Enter the description of the item"
            />
            <div className="flex flex-col  md:flex-row gap-2">
              <Input
                name="listing_item_quantity"
                label="Listing Quantity (No. of portions)"
                type="number"
                placeholder="Item Quantity"
                required={true}
                inputclassname="validator "
                hint="Specify number of portions"
              />
              <Input
                name="listing_item_portion_size"
                label="Portion Size"
                type="number"
                placeholder="Portion Size"
                required={true}
                min={1}
                inputclassname="validator "
                hint="Specify size of portions"
              />
              <Input
                name="listing_item_portion_unit"
                label="Portion Unit "
                type="text"
                placeholder="Portion Unit (Select or type)"
                required={true}
                inputclassname="validator "
                list="units_list"
                hint="Specify unit of portions"
              />

              <datalist id="units_list">
                <option value="grams">Grams</option>
                <option value="kgs">Kgs</option>
                <option value="cans">Cans</option>
                <option value="liters">Liters</option>
                <option value="pieces">Pieces</option>
                <option value="boxes">Boxes</option>
                <option value="packs">Packs</option>
                <option value="bottles">Bottles</option>
                <option value="jars">Jars</option>
              </datalist>
            </div>
            <div className="flex flex-col  md:flex-row gap-2 mb-4">
              <DropdownMultipleSelect
                setListingCategories={setSelectedCategories}
                listingCategories={selectedCategories}
              />
            </div>
            <div className="flex flex-col  md:flex-row gap-2">
              <Input
                name="listing_item_pickup_time"
                label="Pickup Time"
                type="datetime-local"
                placeholder="Pickup Time"
                required={true}
                inputclassname="validator "
                hint="Specify pickup time"
              />
              <Input
                name="listing_item_expiry_time"
                label="Expiry Time"
                type="datetime-local"
                placeholder="Expiry Time"
                required={true}
                inputclassname="validator "
                hint="Specify expiry time"
              />
            </div>
            <div className="flex gap-2 justify-end w-full">
              <button className="btn btn-outline btn-warning">Clear</button>
              <button className="btn  btn-warning">Submit</button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div>
              <img src={imageURL} className="max-h-48" alt="" />
            </div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Upload Food Image (Optional)
              </legend>
              <input
                type="file"
                className="file-input file-input-warning"
                accept="image/*"
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                  handleUpload();
                }}
              />
              <label className="label">Max size 2MB</label>
              {uploading && <label className="label">Uploading...</label>}
            </fieldset>
          </div>
        </form>
      </main>
    </div>
  );
}
