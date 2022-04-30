import { useState } from "react";
import { Category, Product } from "../../helpers/types";
import ModalContainer from "../common/ModalContainer";

type Props = {
  handleClose: () => void;
  handleSubmit: (categories: Array<Category> | null) => void;
  product: Product | null;
};

const CategoryModal = ({ product, handleClose, handleSubmit }: Props) => {
  const [categories, setCategories] = useState<Array<Category>>(
    product?.categories || []
  );

  const handleChange = (id: number) => (e: any) => {
    const newCategories = categories.map((category) => {
      if (category.id === id) {
        return { ...category, name: e.target.value };
      }
      return category;
    });
    setCategories(newCategories);
  };

  

  return (
    <ModalContainer title="Category" handleClose={handleClose}>
      <div className="p-10">
        <div className="p-5">
          {categories.length > 1 ? (
            categories?.map((category, index) => (
              <div className="my-2" key={category.id}>
                <label htmlFor={category.id.toString()}>{index + 1}, </label>
                <input
                  className="px-3 py-1 border-2  rounded-lg outline-1"
                  id={category.id.toString()}
                  type="text"
                  value={category.name}
                  onChange={handleChange(category.id)}
                />
              </div>
            ))
          ) : (
            <div>No Bussiness Category</div>
          )}
        </div>
        <div className="my-5 flex justify-end items-center px-10 gap-x-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-blue-100"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSubmit(categories)}
            className="px-4 py-2 rounded-lg bg-blue-700 text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default CategoryModal;
