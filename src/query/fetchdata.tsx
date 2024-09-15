    import axios from "axios"
    import { link } from "../helpers/link"

    export interface Post {
        "id": number
        "name": string
        "description": string
        "categoryId": number
        "price": number
        "file": []
    }

    export function FetchData(): Promise<Post[]> {
        return axios.get(`${link}product/list`).then(res => res.data.body)
    }
