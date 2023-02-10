import db from "../db/index.js"

import User from "../models/User.js"

const createUser = async (username, plain_password) => {
    let newUser = new User(0, username, plain_password, false)
    await newUser.encryptPassword()

    const row_result = (await db.query(
        "INSERT INTO users(username, password) VALUES($1::VARCHAR, $2::VARCHAR) RETURNING user_id",
        [username, newUser.password])
    ).rows[0]

    if (!row_result)
        throw new Error("There was an error creating the user")

    newUser.user_id = row_result.user_id
    return newUser
}

const deleteUserById = async (user_id) => {
    return await db.query("DELETE FROM users WHERE user_id = $1::INT", [user_id])
}

const deleteUserByUsername = async (username) => {
    return await db.query("DELETE FROM users WHERE username = $1::VARCHAR", [username])
}

const findUserById = async (user_id) => {
    const row_result = (await db.query("SELECT username FROM users WHERE user_id = $1::INT", [user_id])).rows[0]

    if (!row_result)
        throw new Error("Couldn't find a user with that id")

    return new User(user_id, row_result.username)
}

const findUserByUsername = async (username) => {
    const row_result = (await db.query("SELECT user_id FROM users WHERE username = $1::VARCHAR", [username])).rows[0]

    if (!row_result)
        throw new Error("Couldn't find a user with that username")

    return new User(row_result.user_id, username)
}

export default {
    createUser,
    deleteUserById,
    deleteUserByUsername,
    findUserById,
    findUserByUsername
}