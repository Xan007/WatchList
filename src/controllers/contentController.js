import contentService from "../services/contentService.js"

import scrapper from "../utils/scrapper.js"

const cuevana = scrapper.cuevana
const pelisplus = scrapper.pelisplus

export const getContentById = async(req, res, next) => {
    const { content_id } = req.params

    try {
        res.send(await contentService.findContentById(content_id))
    } catch (err) {
        next(err)
    }
}

export const searchContent = async(req, res, next) => {
    const { search, scrapper, page=1 } = req.query

    try {
        if (scrapper == "cuevana")
            res.send(await cuevana.search(search, page))
        else if (scrapper == "pelisplus")
            res.send(await pelisplus.search(search, page))
        else
            throw new Error("Scrapper is not valid")
    } catch (err) {
        next(err)
    }
}

export const getTitleByUrl = async(req, res, next) => {
    const { url } = req.body

    try {
        if (url.startsWith(cuevana.baseUrl))
            res.send(await cuevana.getTitle(url))
        else if (url.startsWith(pelisplus.baseUrl))
            res.send(await pelisplus.getTitle(url))
        else
            throw new Error("URL doesn't match a scrapper")
    } catch (err) {
        next(err)
    }
    
}

export const deleteContentById = async(req, res, next) => {
    const { content_id } = req.params

    try {
        await contentService.deleteContentById(content_id)
        res.send("Content with given id deleted")
    } catch (err) {
        next(err)
    }
}
