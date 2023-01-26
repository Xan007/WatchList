import { safeLoad } from "./scrapper.js"

class Cuevana {
    constructor() {
        this.baseUrl = "https://cuevana3.info";
    }

    async search(query, numberPage = 1) {
        const $ = await safeLoad(`${this.baseUrl}/page/${numberPage}/`, {
            params: {
                s: query
            }
        })

        const resultSearch = []

        $(".results-post > article").each((_, e) => {
            const element = $(e)

            const title = element.find("header > h2").text()
            const link = element.find(".lnk-blk").attr("href")

            resultSearch.push({
                title: title,
                link: link
            })
        })

        return resultSearch
    }

    async getTitle(url) {
        const $ = await safeLoad(url)

        const title = $(".entry-header h1").text()

        return title
    }
}

export default new Cuevana()