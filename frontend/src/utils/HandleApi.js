import axios from "axios";

const baseUrl = "http://localhost:5000";

const getAllCategory = (setCategory) => {
  axios.get(baseUrl).then(({ data }) => {
    console.log("data --->", data);
    setCategory(data);
  });
};

const addCategory = (text, setText, setCategory) => {
  axios
    .post(`${baseUrl}/save`, { text })
    .then((data) => {
      console.log(data);
      setText("");
      getAllCategory(setCategory);
    })
    .catch((err) => console.log(err));
};

const updateCategory = (
  CategoryId,
  text,
  setCategory,
  setText,
  setIsUpdating
) => {
  axios
    .post(`${baseUrl}/update`, { _id: CategoryId, text })
    .then((data) => {
      setText("");
      setIsUpdating(false);
      getAllCategory(setCategory);
    })
    .catch((err) => console.log(err));
};

const updateCategoryItem = (
  { openCategoryId, ...restValues },
  { setCategory, setText, setPrice, setIsUpdating }
) => {
  axios
    .post(`${baseUrl}/update`, { _id: openCategoryId, ...restValues })
    .then((data) => {
      setText("");
      setPrice(0);
      setIsUpdating(false);
      getAllCategory(setCategory);
    })
    .catch((err) => console.log(err));
};

const deleteCategory = (_id, setCategory) => {
  axios
    .post(`${baseUrl}/delete`, { _id })
    .then((data) => {
      console.log(data);
      getAllCategory(setCategory);
    })
    .catch((err) => console.log(err));
};

export {
  getAllCategory,
  addCategory,
  updateCategory,
  updateCategoryItem,
  deleteCategory,
};
