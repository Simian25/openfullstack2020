import {gql} from '@apollo/client'

export const  ALL_BOOKS= gql`
query{
  allBooks{
    title
    author{name,born}
    published
  }
}
`
export const ADD_BOOK = gql`
mutation addBoook($title: String!,$author: String!, $published: Int!, $genres:[String!]!) {
  addBook(title: $title,author:$author,published:$published,genres:$genres) {
    title
    author{name}  
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`