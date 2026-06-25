import { Request, Response } from 'express';
import { getAllPoojaNivedyam, getNivedyamByPooja, addPoojaNivedyam, updatePoojaNivedyam, deletePoojaNivedyam } from "../models/poojaNivedyamModel.js";

const getPoojaNivedyams = async (req: Request, res: Response): Promise<void> => {
    try {
        const nivedyams = await getAllPoojaNivedyam();
        res.json(nivedyams);
    } catch (err: any) {
        console.error("Error fetching pooja nivedyams:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getPoojaNivedyamsById = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("request params....." + JSON.stringify(req.params));
        const { pooja_id } = req.params;
        const nivedyams = await getNivedyamByPooja(pooja_id);
        res.json(nivedyams);
    } catch (err: any) {
        console.error("Error fetching pooja nivedyams by id:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const createPoojaNivedyam = async (req: Request, res: Response): Promise<void> => {
    try {
        const newNivedyam = await addPoojaNivedyam(req.body);
        res.json(newNivedyam);
    } catch (err: any) {
        console.error("Error adding pooja nivedyam:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const updatePoojaNivedyamById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedNivedyam = await updatePoojaNivedyam(id, req.body);
        res.json(updatedNivedyam);
    } catch (err: any) {
        console.error("Error updating pooja nivedyam:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const deletePoojaNivedyamById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await deletePoojaNivedyam(id);
        res.json({ message: "Deleted successfully" });
    } catch (err: any) {
        console.error("Error deleting pooja nivedyam:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export { getPoojaNivedyams, getPoojaNivedyamsById, createPoojaNivedyam, updatePoojaNivedyamById, deletePoojaNivedyamById };
