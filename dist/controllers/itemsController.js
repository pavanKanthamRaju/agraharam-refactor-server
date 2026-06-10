import { createItem, getAllItems, updateItem, deleteItem, findItem } from "../models/itemsModel.js";
const addItem = async (req, res) => {
    try {
        const { item_name, description, default_quantity, price, units, image } = req.body;
        if (!item_name) {
            res.status(400).json({ success: false, message: "Item name is required" });
            return;
        }
        const existingItem = await findItem(item_name);
        console.log("existingItem", existingItem);
        if (existingItem) {
            res.status(400).json({ success: false, message: "Item already existed please enter new Item" });
            return;
        }
        const newItem = await createItem({ item_name, description, default_quantity, price, units, image });
        res.status(201).json({ success: true, item: newItem });
    }
    catch (err) {
        console.error("Error creating item:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
const getItems = async (req, res) => {
    try {
        const items = await getAllItems();
        res.json({ success: true, items });
    }
    catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
const updateItemController = async (req, res) => {
    try {
        const { id } = req.params;
        const { item_name, description, default_quantity, price, units, image } = req.body;
        const updatedItem = await updateItem(id, { item_name, description, default_quantity, price, units, image });
        if (!updatedItem) {
            res.status(404).json({ success: false, message: "Item not found" });
            return;
        }
        res.json({ success: true, item: updatedItem });
    }
    catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ success: false, message: "Failed to update item" });
    }
};
const deleteItemController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await deleteItem(id);
        if (!deletedItem) {
            res.status(404).json({ success: false, message: "Item not found" });
            return;
        }
        res.json({ success: true, message: "Item deleted successfully", item: deletedItem });
    }
    catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ success: false, message: "Failed to delete item" });
    }
};
export { addItem, getItems, updateItemController, deleteItemController };
//# sourceMappingURL=itemsController.js.map