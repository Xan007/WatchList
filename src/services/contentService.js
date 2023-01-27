import db from "../db/index.js"

const createContent = async(title, type, links) => {
    const {cuevana_link, pelisplus_link } = links

    return (await db.query("INSERT INTO content(title, type, cuevana_link, pelisplus_link) VALUES($1::VARCHAR, $2::VARCHAR, $3::TEXT, $4::TEXT)", [title, type, cuevana_link, pelisplus_link])).rows
}

const findContentByTitle = async(content_title) => {
    return (await db.query("SELECT * FROM content WHERE title = $1::VARCHAR", [content_title])).rows
}

const findContentById = async(content_id) => {
    return (await db.query("SELECT * FROM content WHERE content_id = $1::INT", [content_id])).rows
}

const deleteContentByTitle = async(content_title) => {
    return (await db.query("DELETE FROM content WHERE title = $1::VARCHAR", [content_title]))
}

const deleteContentById = async(content_id) => {
    return (await db.query("DELETE FROM content WHERE content_id = $1::INT", [content_id]))
}

export default {
    createContent,
    findContentByTitle,
    findContentById,
    deleteContentByTitle,
    deleteContentById
}