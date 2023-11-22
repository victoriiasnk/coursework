import { useEffect, useState } from "react";
import ListItem from "./components/ListItem";
import { FaArrowLeft } from "react-icons/fa";
import {
  addCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  updateCategoryItem,
} from "./utils/HandleApi";

function App() {
  const [categories, setCategory] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryItemIndex, setCategoryItemIndex] = useState(null);
  const [openCategoryId, setOpenCategoryId] = useState(null);

  useEffect(() => {
    getAllCategory(setCategory);
  }, []);

  const updateCategoryMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setCategoryId(_id);
  };

  const updateCategoryItemMode = (index, text, price) => {
    setIsUpdating(true);
    setText(text);
    setPrice(price);
    setCategoryItemIndex(index);
  };

  const handleUpdateCategory = () => {
    updateCategory(categoryId, text, setCategory, setText, setIsUpdating);
  };

  const handleUpdateCategoryItem = () => {
    const items = singleCategory.items.map((item, index) => {
      if (index === categoryItemIndex) {
        return {
          text,
          price,
        };
      }

      return item;
    });

    updateCategoryItem(
      { openCategoryId, items },
      { setCategory, setText, setPrice, setIsUpdating }
    );
  };

  const handleAddCategoryItem = () => {
    const items = [{ text, price }, ...singleCategory.items];

    updateCategoryItem(
      { openCategoryId, items },
      { setCategory, setText, setPrice, setIsUpdating }
    );
  };

  const handleDeleteCategoryItem = (index) => {
    const items = [...singleCategory.items];

    items.splice(index);

    updateCategoryItem(
      { openCategoryId, items },
      { setCategory, setText, setPrice, setIsUpdating }
    );
  };

  const singleCategory = categories.find(
    (category) => category._id === openCategoryId
  );

  const totalPrice = openCategoryId
    ? singleCategory.items?.reduce((total, item) => total + +item.price, 0)
    : categories?.reduce(
        (categoryTotal, category) =>
          categoryTotal +
          +category.items?.reduce((total, item) => total + +item.price, 0),
        0
      );

  return (
    <div className="App">
      {openCategoryId && (
        <FaArrowLeft
          onClick={() => setOpenCategoryId(null)}
          className="arrow-left"
        />
      )}
      <span className="total-price">
        {openCategoryId ? "Category price" : "Total price"}: {totalPrice}
      </span>
      <div className="container">
        <h1>{openCategoryId ? singleCategory.text : "Categories"}</h1>

        <div className="top">
          <input
            type="text"
            placeholder={openCategoryId ? "Add item" : "Add category"}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {openCategoryId && (
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          )}

          <div
            className="add"
            onClick={
              isUpdating
                ? () =>
                    openCategoryId
                      ? handleUpdateCategoryItem()
                      : handleUpdateCategory()
                : () =>
                    openCategoryId
                      ? handleAddCategoryItem()
                      : addCategory(text, setText, setCategory)
            }
          >
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>

        <div className="list">
          {!openCategoryId &&
            categories?.map((category) => (
              <ListItem
                _id={category._id}
                key={category._id}
                text={category.text}
                onTextClick={() => setOpenCategoryId(category._id)}
                updateItem={() =>
                  updateCategoryMode(category._id, category.text)
                }
                deleteItem={() => deleteCategory(category._id, setCategory)}
              />
            ))}
          {!!openCategoryId &&
            singleCategory.items?.map((item, index) => (
              <ListItem
                text={item.text}
                price={item.price}
                key={Math.random()}
                updateItem={() =>
                  updateCategoryItemMode(index, item.text, item.price)
                }
                deleteItem={() => handleDeleteCategoryItem(index)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
