import db from "../db/index.js"

import bcryptjs from "bcryptjs"

import { Router } from "express";

import { signToken } from "../middleware/auth.js"
import userService from "../services/userService.js";

const router = Router()

router.post("/login", async (req, res, next) => {
    const { username, password } = req.body

    try {
        const user = await userService.findUserByUsername(username)
        const { password: hash_user } = (await db.query("SELECT password FROM users WHERE user_id=$1", [user.user_id])).rows[0]
        
        if (!await bcryptjs.compare(password, hash_user))
            throw new Error("Password doesn't match")

        const { user_id } = user

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