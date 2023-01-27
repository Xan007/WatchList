import db from "../db/index.js"

class WatchList {
    constructor(user_id, list_name) {
        this.user_id = user_id
        this.list_name = list_name
    }

    async postContentById(content_id) {
        return (await db.query("INSERT INTO watch_users(user_id, content_id) VALUES($1::INT, $2::INT)", [this.user_id, content_id])).rows
    }

    async deleteContentById(content_id) {
        return (await db.query("DELETE FROM watch_users WHERE user_id = $1::INT AND content_id = $2::INT", [this.user_id, content_id])).rows
    }

    async getContentByType(content_type) {
        return (await db.query(
            "SELECT * FROM watch_users INNER JOIN content USING(content_id) WHERE user_id = $1::INT AND list = $2::VARCHAR AND type = $3::VARCHAR",
            [this.user_id, this.list_name, content_type])
        ).rows
    }

    async getContent() {
        return (await db.query(
            "SELECT * FROM watch_users INNER JOIN content USING(content_id) WHERE user_id = $1::INT AND list = $2::VARCHAR",
            [this.user_id, this.list_name])
        ).rows
    }

    async getMovies() {
        return (await this.getContentByType("Movies")).rows
    }

    async getSeries() {
        return (await this.getContentByType("Series")).rows
    }
}

export default WatchList