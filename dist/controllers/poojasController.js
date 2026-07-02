import { getAllPoojas, createPooja, modifyPooja } from "../models/poojaModel.js";
const getPoojas = async (req, res) => {
    try {
        const start = Date.now();
        console.log(`start ${req.method} ${req.originalUrl}: ${Date.now() - start} ms`);
        const result = await getAllPoojas();
        console.log(`end ${req.method} ${req.originalUrl}: ${Date.now() - start} ms`);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch Poojas" });
    }
};
const postPooja = async (req, res) => {
    try {
        console.log("Received Pooja data:", req.body);
        const newPooja = await createPooja(req.body);
        res.status(201).json(newPooja);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create pooja' });
    }
};
const updatePooja = async (req, res) => {
    try {
        const { id } = req.params;
        const poojaData = req.body;
        if (!id) {
            res.status(400).json({ error: "Pooja ID is required for update" });
            return;
        }
        const updatedPooja = await modifyPooja(id, poojaData);
        res.status(200).json(updatedPooja);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update pooja" });
    }
};
export { getPoojas, postPooja, updatePooja };
//# sourceMappingURL=poojasController.js.map