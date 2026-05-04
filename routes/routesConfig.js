import express from "express"
import userRoutes from "./userRoutes.js"
import authRouts from "./authRouts.js"
import poojasRouts from "./poojaRoutes.js"
import paymentRoutes from "./paymentRoutes.js"
import orderRoutes from "./orderRoutes.js"
import itemRoutes from "./itemRoutes.js"
import poojaItemsRoutes from "./poojaItemsRoute.js"
import announcementRoutes from "./announcementRoute.js"

const router = express.Router();

router.use('/users', userRoutes)
router.use('/auth',authRouts)
router.use('/poojas', poojasRouts)
router.use('/payment', paymentRoutes)
router.use('/orders', orderRoutes)
router.use('/items', itemRoutes)
router.use('/poojaItems', poojaItemsRoutes)
router.use('/announcements', announcementRoutes)

export default router;
