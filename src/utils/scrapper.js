import axios from "axios";
import { load } from "cheerio";

import cuevana from "./cuevana.js"
import pelisplus from "./pelisplus.js"

export const safeLoad = async (url, options = {}) => {
    try {
        const { data: pageData } = await axios.get(url, options)
        const $ = load(pageData)

        return $
    } catch (err) {
        if (err.response)
            throw new Error(err.response.statusText)
        throw err
    }
}

export default {
    cuevana,
    pelisplus
}