import { readSync } from "fs";
import people from "./dataset"; //get all of the available data from our database.
import { getBook, getBooks } from "./Engine/Helpers/BookResolverHelpers";
import { DeleteCategory, getAllCategories, getCategory, postCategory, putCategory } from "./Engine/Helpers/CatgeoryResolverHelpers";


const Resolvers = {
    Query: {

        getAllBooks: async () => {
            let data = await getBooks()
            return data
        },

        getBook: async (_: any, args: any) => {
            let data = await getBook(args.id)
            return data
        },

        getAllCategories: async () => {
            let data = await getAllCategories()
            return data
        },

        getCategory: async (_: any, args: any) => {
            let data = await getCategory(args.id)
            return data
        },

    },


    //all our mutations go here.
    Mutation: {

        //create our mutation:
        addCategory: async (_: any, args: any) => {
            try {
                const category = await postCategory(args.name)
                return {
                    data: category,
                    ok: true,
                    error: ''
                }
            } catch (error: any) {
                return {
                    data: "",
                    ok: true,
                    error: error.message
                }
            }
        },

        EditCategory: async (_: any, args: any) => {
            try {
                const category = await putCategory(args.id, args.name)
                return {
                    data: category,
                    ok: true,
                    error: ''
                }
            } catch (error: any) {
                return {
                    data: "",
                    ok: true,
                    error: error.message
                }
            }
        },

        DeleteCategory: async (_: any, args: any) => {
            try {
                const category = await DeleteCategory(args.id)
                return {
                    data: category,
                    ok: true,
                    error: ''
                }
            } catch (error: any) {
                return {
                    data: "",
                    ok: true,
                    error: error.message
                }
            }
        },

    },
};

export default Resolvers;