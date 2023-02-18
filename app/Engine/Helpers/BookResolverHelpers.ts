import { Book } from "../Models/Book"
import { Category } from "../Models/Category"


export const getBooks = async () => {

    let data = await Book.findAll()

    data = JSON.parse(JSON.stringify(data))
    return data

}

export const getBook = async (id: any) => {

    let data = await Book.findOne({
        where: {
            id: id
        }
    })
    return data
}

