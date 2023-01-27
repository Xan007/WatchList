import bcryptjs from "bcryptjs"
import db from "../db/index.js"

import WatchList from "./WatchList.js"

class User {
    constructor(user_id, username, password="", encrypted=true) {
        this.user_id = user_id
        this.username = username
        this.password = password
        this.encrypted = encrypted
    }

    async encryptPassword() {
        if (this.encrypted)
            throw new Error("The password is already encrypted")
        
        this.password = await bcryptjs.hash(this.password, 10)
        this.encrypted = true
    }

    async getListsName() {
        return (await db.query(
            "SELECT DISTINCT list FROM watch_users WHERE user_id = $1::INT",
            [this.user_id])
        ).rows
    }

    async getLists() {
        const lists = []
        (await this.getListsName()).forEach((list_name) => {
            lists.push(new WatchList(user_id, list_name))
        })
        return lists
    }

    async getListByName(list_name) {
        //Comprobar.
        const exists = await db.query("SELECT EXISTS(SELECT 1 FROM watch_users WHERE user_id = $1::INT AND list = $2::VARCHAR)", [this.user_id, list_name]).rows

        if (!exists)
            throw new Error("List doesn't exist")
        
        return new WatchList(user_id, list_name)
    }
}

export default User