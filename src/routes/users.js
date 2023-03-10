import { Router } from "express";

import {
    getUserById,
    getWatchLists,
    getWatchListByName,
    deleteUserById,
    postUser
} from "../controllers/userController.js"

import { authenticate, hasRole } from "../middleware/auth.js";

const router = Router()

router.post("/", postUser)

router.get("/:user_id", getUserById)

//Devuelve todas las listas del usuario
//Add query parameter
//Type = movies/series
router.get("/:user_id/watch_list", getWatchLists)

//Devuelve la lista del usuario
//Add query parameter
//Type = movies/series
router.get("/:user_id/watch_list/:list_name", getWatchListByName)

router.delete("/:user_id", authenticate, hasRole("Admin"), deleteUserById)

export default router