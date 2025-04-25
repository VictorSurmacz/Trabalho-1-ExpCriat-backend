import express from "express";
import { getUsers, deleteUsers, updateUser, createUser } from "../Controllers/users.js";

const router = express.Router()

router.get("/", getUsers)
router.put("/:id", updateUser)
router.post("/", createUser);
router.delete("/:id", deleteUsers)

export default router

