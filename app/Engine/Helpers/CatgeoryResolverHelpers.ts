import { Category } from "../Models/Category"


export const getAllCategories = async () => {

    let data = await Category.findAll()

    data = JSON.parse(JSON.stringify(data))

    return data

}


export const getCategory = async (id: any) => {

    let data = await Category.findOne({
        where: {
            id: id
        }
    })
    return data
}

export const postCategory = async (name: any) => {

    let data = await Category.create({
        name: name
    })

    return data
}

export const putCategory = async (id: any, name: any) => {

    let data: any = await Category.findOne({
        where: { id: id }
    })

    data.name = name

    await data?.save()

    return data
}


export const DeleteCategory = async (id: any) => {

    let data: any = await Category.destroy({
        where: { id: id }
    })

    return data

}




