import db from "../db/index.js"

import bcryptjs from "bcryptjs"

const createUser = async(username, plain_password) => {
    const hash_password = await bcryptjs.hash(plain_password, 10)

    return await db.query("INSERT INTO users(username, password) VALUES($1::VARCHAR, $2::VARCHAR)", [username, hash_password])
}

const deleteUserById = async(user_id) => {
    return await db.query("DELETE FROM users WHERE user_id = $1::INT", [user_id])
}

const deleteUserByUsername = async(username) => {
    return await db.query("DELETE FROM users WHERE username = $1::VARCHAR", [username])
}

const findUserById = async(user_id) => {
    return (await db.query("SELECT * FROM users WHERE user_id = $1::INT", [user_id])).rows[0]
}

const findUserByUsername = async(username) => {
    return (await db.query("SELECT * FROM users WHERE username = $1::VARCHAR", [username])).rows[0]
}

export default {
    createUser,
    deleteUserById,
    deleteUserByUsername,
    findUserById,
    findUserByUsername
}