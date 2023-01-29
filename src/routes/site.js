import db from "../db/index.js"

import bcryptjs from "bcryptjs"

import { Router } from "express";

import { signToken } from "../middleware/auth.js"
import userService from "../services/userService.js";

const router = Router()

router.post("/login", async (req, res, next) => {
    const { username, password } = req.body
    const hashpassword = await bcryptjs.hash(password, 10)

    try {
        const row_result = await db.query("SELECT user_id FROM users WHERE username = $1::VARCHAR AND password = $2::VARCHAR)", [username, hashpassword]).rows[0]
        if (!row_result)
            throw new Error("No user with the credentials given")

        const { user_id } = row_result

        const token = signToken(user_id);

        res.set("Authorization", `JWT ${token}`);
        res.send({
            token: token,
        });
    } catch (err) {
        next(err)
    }
})

router.post("/register", async(req, res, next) => {
    const { username, password } = req.body
    try {
        const user = await userService.createUser(username, password)    
        res.send(user)
    } catch (err) {
        next(err)
    }
})

export default router