import { Router } from "express";
import { listAll, deleteProduct, updateProduct } from "./controller.js";

const router = Router();

router.get('/', listAll)
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct)

//
export default router;