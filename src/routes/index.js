import users from "./users.js"
import watchList from "./watchList.js"
import content from "./content.js"
import site from "./site.js"

export default (app) => {
    app.use("/users/", users)
    app.use("/watchlist/", watchList)
    app.use("/content/", content)
    app.use("/", site)
}