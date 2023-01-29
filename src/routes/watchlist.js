import { Router } from "express";

import {
    getUserWatchListByName,
    getUserWatchLists,
    postContentToList,
    deleteContentFromList
} from "../controllers/watchlistController.js"

import { authenticate, hasRole } from "passport";

const router = Router()

//Redirect a /users/:user_id/watch_list
//Query type = Movie/Series
router.get("/", authenticate, getUserWatchLists)

//Redirect a /users/:user_id/watch_list/:list_name
//Añadir Query parameters
//Type = Movie/Series
router.get("/:list_name", authenticate, getUserWatchListByName)

//Añade un contenido a una lista
//Body: {content_id : 0000}
router.post("/:list_name", authenticate, postContentToList)

//Elimina un contenido de una lista
router.delete("/:list_name/:content_id", authenticate, deleteContentFromList)

export default router