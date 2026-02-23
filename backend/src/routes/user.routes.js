import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  patchUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/:id", patchUser);
router.delete("/:id", deleteUser);

export default router;