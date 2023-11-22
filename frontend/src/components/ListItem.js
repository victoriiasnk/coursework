import React from "react";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const ListItem = ({ text, price, updateItem, deleteItem, onTextClick }) => {
  return (
    <div className="item">
      <div
        className={onTextClick ? "text-underline" : ""}
        onClick={onTextClick && onTextClick}
      >
        {text}
      </div>
      <div className="icons">
        {price && <span>{price}</span>}
        <BiEdit className="icon" onClick={updateItem} />
        <AiFillDelete className="icon" onClick={deleteItem} />
      </div>
    </div>
  );
};

export default ListItem;
