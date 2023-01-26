import { safeLoad } from "./scrapper.js"

class PelisPlus {
    constructor() {
        this.baseUrl = "https://pelisplushd.nz";
    }

    async search(query, numberPage = 1) {
        const $ = await safeLoad(`${this.baseUrl}/search/`, {
            params: {
                s: query,
                page: numberPage
            }
        })

        const resultSearch = []

        $("a[class^='Posters']").each((_, e) => {
            const element = $(e)

            const title = element.find(".listing-content > p").text()
            const link = element.attr("href")

            resultSearch.push({
                title: title, 
                link: link
            })
        })

        return resultSearch
    }

    async getTitle(url) {
        const $ = await safeLoad(url)
        
        const title = $(".card-body h1").text().trim()

        return title
    }
}

export default new PelisPlus()