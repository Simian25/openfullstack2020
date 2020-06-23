import {gql} from '@apollo/client'

export const  ALL_BOOKS= gql`
query{
  allBooks{
    title
    author
    published
  }
}
`
export const ADD_BOOK = gql`
mutation addBoook($title: String!,$author: String!, $published: Int!, $genres:[String!]!) {
  addBook(title: $title,author:$author,published:$published,genres:$genres) {
    title
    author 
    published
    genres
  }
}

`
export const ALL_AUTHORS= gql`
  query{
    allAuthors{
      name
      born
      bookCount
    }
  }
  
  `
export const UPDATE_BIRTH=gql`
mutation updateBirth($name: String!,$born:Int!){
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`
