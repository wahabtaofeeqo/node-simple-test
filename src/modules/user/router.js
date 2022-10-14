import { Router } from "express";
import { profile, updateAccount } from "./controller.js";

const router = Router();

router.get('/', profile)
router.put('/', updateAccount)

//
export default router;