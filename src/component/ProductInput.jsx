import React, { useState, useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import DragHandleIcon from "./DragHandleIcon";
import { ProductContext } from "./ProductProvider";
import EditIcon from "./EditIcon";
import RemoveIcon from "./RemoveIcon";
import Variants from "./Variants";

const ProductInput = ({ product, idx, openPicker }) => {
  const { title, variants } = product;
  const id = product.id === "null" ? idx : product.id;

  const [Discount, setDiscount] = useState(null);

  const { setEditIndex, ProductsLength, removeItem } =
    useContext(ProductContext);

  const handleEditItem = () => {
    openPicker();
    setEditIndex(idx);
  };

  return (
    <Draggable index={idx} draggableId={id.toString()}>
      {(provided, snapshot) => (
        <>
          <div
            className="flex gap-6 mt-4 items-center"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <DragHandleIcon {...provided.dragHandleProps} />
            <p>{idx + 1}.</p>
            <div className="bg-white border-2 w-full drop-shadow flex justify-between items-center">
              <div className="m-2">{title ? title : "Select Product"}</div>
              <EditIcon handleEditItem={handleEditItem} />
            </div>
            {Discount === null ? (
              <button
                onClick={() => setDiscount(0)}
                className="bg-button w-96 text-white py-2 px-4 rounded-md"
              >
                <p>Add Discount</p>
              </button>
            ) : (
              <>
                <input
                  type="text"
                  min="0"
                  max="100"
                  class=" form-control block w-20 px-3 py-1.5 text-base font-normal   bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:bg-white focus:outline-none "
                  value={Discount}
                  type="number"
                  onChange={(e) => setDiscount(e.target.value)}
                />
                <select className="form-select block w-28 px-3 py-[0.5rem] text-base font-normal   bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0  focus:bg-white focus:outline-none">
                  <option selected value="1">
                    % Off
                  </option>
                  <option value="2">Flat Off</option>
                </select>
              </>
            )}
            {ProductsLength > 1 ? (
              <RemoveIcon
                onClick={() => {
                  removeItem(idx);
                }}
              />
            ) : null}
          </div>
          <Variants variants={variants} productid={id} discount={Discount} />
        </>
      )}
    </Draggable>
  );
};

export default ProductInput;
