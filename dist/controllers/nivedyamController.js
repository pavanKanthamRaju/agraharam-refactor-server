import { createNivedyam, getAllNivedyam, updateNivedyam, deleteNivedyam, findNivedyam } from "../models/nivedyamModel.js";
const addNivedyam = async (req, res) => {
    try {
        const { nivedyam_name, description, category_id, price, unit, image_url } = req.body;
        if (!nivedyam_name) {
            res.status(400).json({ success: false, message: "Nivedyam name is required" });
            return;
        }
        const existingNivedyam = await findNivedyam(nivedyam_name);
        console.log("existingNivedyam", existingNivedyam);
        if (existingNivedyam) {
            res.status(400).json({ success: false, message: "Nivedyam already existed please enter new Nivedyam" });
            return;
        }
        const newNivedyam = await createNivedyam({ nivedyam_name, description, category_id, price, unit, image_url });
        res.status(201).json({ success: true, nivedyam: newNivedyam });
    }
    catch (err) {
        console.error("Error creating nivedyam:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
const getNivedyams = async (req, res) => {
    try {
        const nivedyams = await getAllNivedyam();
        res.json({ success: true, nivedyams });
    }
    catch (err) {
        console.error("Error fetching nivedyams:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
const updateNivedyamController = async (req, res) => {
    try {
        const { id } = req.params;
        const { nivedyam_name, description, category_id, price, unit, image_url } = req.body;
        const updatedNivedyam = await updateNivedyam(id, { nivedyam_name, description, category_id, price, unit, image_url });
        if (!updatedNivedyam) {
            res.status(404).json({ success: false, message: "Nivedyam not found" });
            return;
        }
        res.json({ success: true, nivedyam: updatedNivedyam });
    }
    catch (error) {
        console.error("Error updating nivedyam:", error);
        res.status(500).json({ success: false, message: "Failed to update nivedyam" });
    }
};
const deleteNivedyamController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNivedyam = await deleteNivedyam(id);
        if (!deletedNivedyam) {
            res.status(404).json({ success: false, message: "Nivedyam not found" });
            return;
        }
        res.json({ success: true, message: "Nivedyam deleted successfully", nivedyam: deletedNivedyam });
    }
    catch (error) {
        console.error("Error deleting nivedyam:", error);
        res.status(500).json({ success: false, message: "Failed to delete nivedyam" });
    }
};
export { addNivedyam, getNivedyams, updateNivedyamController, deleteNivedyamController };
//# sourceMappingURL=nivedyamController.js.map