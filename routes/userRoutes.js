import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getSingleUser,
} from "../controllers/userController.js";
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getSingleUser);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);




export default router;