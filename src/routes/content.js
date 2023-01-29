import { Router } from "express";

const router = Router()

import { authenticate, hasRole } from "passport";

import {
    getContentById,
    searchContent,
    getTitleByUrl,
    deleteContentById

} from "../controllers/contentController.js"

//Información de un contenido
router.get("/:content_id", getContentById)

//Hace una búsqueda
//TO DO: Primero se hace la búsqueda por la base de datos
//query: { search: "Búsqueda aquí", scrapper: "cuevana/pelisPlus", page: 1 }
router.get("/", authenticate, searchContent)

//Obtiene el titulo
//Auto-detectar el scrapper a usar
//body: { url: "https://" }
router.get("/title", authenticate, getTitleByUrl)

//Borra un contenido con su id
router.delete("/:content_id", authenticate, hasRole("Admin"), deleteContentById)

export default router