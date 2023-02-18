import { gql } from "apollo-server-express"; //will create a schema
const Schema = gql`
  type Book {
    id: ID!
    uuid:String!
    category_id:ID
    title: String
    front_cover: String
  }

  type Category {
    id: ID!
    name:String!
  }

  type CategoryResponse {
    data: Category
    error: String
    ok: Boolean
  }

  #handle user commands
  type Query {
    getCategory(id: Int):Category
    getAllCategories:[Category]
    getBook(id: Int):Book
    getAllBooks:[Book]
  }

  type Mutation {
    addCategory(name: String): CategoryResponse
    EditCategory(id:ID,name:String):CategoryResponse
    DeleteCategory(id:ID):CategoryResponse
  }
`;
export default Schema;
//export this Schema so we can use it in our project
