import pg from "pg"
import config from "config" 

const { Pool } = pg

const pool = new Pool(
  config.get("postgreSQL")
)
 
export default {
  query: (text, params) => pool.query(text, params),
}