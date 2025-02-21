import express from "express";
import { register, login, getAllUsers } from "../controllers/UserBoController.js";
import { apiKey } from "../middleware/apiKey.js";

const router = express.Router();

router.use(apiKey);

router.get("/get-all-users", getAllUsers);
router.post("/register", register);
router.post("/login", login);

export default router;
