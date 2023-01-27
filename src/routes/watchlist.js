import { Router } from "express";

import {
    getUserWatchListByName,
    getUserWatchLists,
    postContentToList,
    deleteContentFromList
} from "../controllers/watchlistController.js"

const router = Router()

//Redirect a /users/:user_id/watch_list
//Query type = Movie/Series
router.get("/", getUserWatchLists)

//Redirect a /users/:user_id/watch_list/:list_name
//Añadir Query parameters
//Type = Movie/Series
router.get("/:list_name", getUserWatchListByName)

//Añade un contenido a una lista
//Body: {content_id : 0000}
router.post("/:list_name", postContentToList)

//Elimina un contenido de una lista
router.delete("/:list_name/:content_id", deleteContentFromList)

export default router