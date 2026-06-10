import { Request, Response } from 'express';
import { getAllPoojaItems, getItemsByPooja, addPoojaItem, updatePoojaItem, deletePoojaItem } from "../models/poojaItemsModel.js";

const getPoojaItems = async (req: Request, res: Response): Promise<void> => {
    const items = await getAllPoojaItems();
    res.json(items);
};

const getPoojaItemsById = async (req: Request, res: Response): Promise<void> => {
    console.log("request params....." + JSON.stringify(req.params));
    const { pooja_id } = req.params;
    const items = await getItemsByPooja(pooja_id);
    res.json(items);
};

const createPoojaItem = async (req: Request, res: Response): Promise<void> => {
    const newItem = await addPoojaItem(req.body);
    res.json(newItem);
};

const updatePoojaItemById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedItem = await updatePoojaItem(id, req.body);
    res.json(updatedItem);
};

const deletePoojaItemById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await deletePoojaItem(id);
    res.json({ message: "Deleted successfully" });
};

export { getPoojaItems, getPoojaItemsById, createPoojaItem, updatePoojaItemById, deletePoojaItemById };
