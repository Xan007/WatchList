import userService from "../services/userService.js"

export const getUserById = async(req, res, next) => {
    const { user_id } = req.params
    try {
        const user = await userService.findUserById(user_id)

        if (!user)
            throw new Error("User doesn't exist")

        return res.send(user)
    } catch (err) {
        next(err)
    }
}

export const getWatchListByName = async(req, res, next) => {
    const { user_id, list_name } = req.params
    const { type } = req.query

    try {
        const user = await userService.findUserById(user_id)
        const list = await user.getListByName(list_name)

        if (type == "Series")
            res.send(await list.getSeries())
        else
            res.send(await list.getMovies())
    } catch (err) {
        next(err)
    }
}

export const getWatchLists = async(req, res, next) => {
    const { user_id } = req.params
    const { type } = req.query

    try {
        const user = await userService.findUserById(user_id)
        const lists = await user.getLists()

        const watch_list = {}

        lists.forEach(async list_instance => {
            if (type == "Series")
                watch_list[list_instance.list_name] = await list_instance.getSeries()
            else
                watch_list[list_instance.list_name] = await list_instance.getMovies()
        });

        res.send(watch_list)
    } catch (err) {
        next(err)
    }
}

export const postUser = async(req, res, next) => {
    const { username, password } = req.body

    try {
        res.send(await userService.createUser(username, password))
    } catch (err) {
        next(err)
    }
}

export const deleteUserById = async(req, res, next) => {
    const { user_id } = req.params

    try {
        await userService.deleteUserById(user_id)

        res.send("User deleted correctly")
    } catch (err) {
        next()
    }
}