import {getAllPoojaItems, getItemsByPooja,addPoojaItem, updatePoojaItem,deletePoojaItem} from "../models/poojaItemsModal.js"

 const getPoojaItems = async (req, res) => {
  const items = await getAllPoojaItems();
  res.json(items);
};

 const getPoojaItemsById = async (req, res) => {
  console.log("request params....."+ JSON.stringify(req.params));
  const { pooja_id } = req.params;

  const items = await getItemsByPooja(pooja_id);
  res.json(items);
};

 const createPoojaItem = async (req, res) => {
  const newItem = await addPoojaItem(req.body);
  res.json(newItem);
};

 const updatePoojaItemById = async (req, res) => {
  const { id } = req.params;
  const updatedItem = await updatePoojaItem(id, req.body);
  res.json(updatedItem);
};

 const deletePoojaItemById = async (req, res) => {
  const { id } = req.params;
  await deletePoojaItem(id);
  res.json({ message: "Deleted successfully" });
};
export {getPoojaItems, getPoojaItemsById, createPoojaItem, updatePoojaItemById, deletePoojaItemById};
