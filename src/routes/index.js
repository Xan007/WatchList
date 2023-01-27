import users from "./users.js"
import watchList from "./watchList.js"

export default (app) => {
    app.use("/users/", users)
    app.use("/watchlist/", watchList)
}