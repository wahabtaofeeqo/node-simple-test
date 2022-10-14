import { Router } from "express";
import { deleteOrder, listAll } from "./controller.js";

const router = Router();

//
router.get('/order_items', listAll)
router.delete('/order_items/:id', deleteOrder)

//
export default router;