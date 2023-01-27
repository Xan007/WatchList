import watchService from "../services/watchService.js"
import userService from "../services/userService.js"

export const getUserWatchLists = async(req, res, next) => {
    //Usuario autentica
    const { user_id } = req.user

    res.redirect(`/user/${user_id}/watch_list`)
}

export const getUserWatchListByName = async(req, res, next) => {
    const { user_id } = req.user
    const { list_name } = req.params

    res.redirect(`/users/${user_id}/watch_list/${list_name}`)
}

export const postContentToList = async(req, res, next) => {
    const { user_id } = req.user
    const { content_id } = req.body
    const { list_name } = req.params

    //Ya estaría por el auth
    const user = await userService.findUserById(user_id)
    const watch_list = await user.getListByName(list_name)

    try {
        await watch_list.postContentById(content_id)

        res.send(`Added content with id ${content_id} to ${list_name} list`)
    } catch (err) {
        next(err)
    }
}

export const deleteContentFromList = async(req, res, next) => {
    const { list_name, content_id } = req.params

    const user = await userService.findUserById(user_id)
    const watch_list = await user.getListByName(list_name)
    
    try {
        await watch_list.deleteContentById(content_id)

        res.send(`Deleted content with id ${content_id} from ${list_name} list`)
    } catch (err) {
        next(err)
    }
}