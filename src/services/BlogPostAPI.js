import { baseUrl } from "../BaseUrl"
import axios from 'axios'

export const getListOfBlogPost = (
    successHandler,
    errorHandler
) => {
    let api = `${baseUrl}everything?q=apple&from=2024-07-17&to=2024-07-17&sortBy=popularity&apiKey=20adeccdd40b49f6bcef9d1a124c6886`;

    axios.get(api).then((respo) => successHandler(respo)).catch((err) => errorHandler(err))
}