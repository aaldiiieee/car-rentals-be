import express from "express";
import { register, login } from "../controllers/UserBoController.js";
import { apiKey } from "../middleware/apiKey.js";

const router = express.Router();

router.use(apiKey);

router.post("/register", register);
router.post("/login", login);

export default router;
