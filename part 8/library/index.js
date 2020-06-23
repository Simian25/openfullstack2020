const { ApolloServer,UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book  = require('./models/book')
require('dotenv').config()

let url = process.env.MONGO_URL

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology',true)
console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })
const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id:String!
  }
  type Query {
    allBooks(author: String,genre: String): [Book!]!
    allAuthors: [Author!]!
    bookCount: Int!
    authorCount: Int!
  }
  type Mutation{
    addBook(title: String!,author: String!, published: Int!,genres:[String!]!): Book!
    editAuthor(name: String!,setBornTo: Int!): Author
  }
`
const { v1: uuid } = require('uuid')

const resolvers = {
  Query: {
    allBooks: ()=>Book.find({}).populate('author',{name:1}),
    allAuthors:()=>Author.find({}),
    bookCount:  ()=>Book.countDocuments({}),
    authorCount: ()=>Author.countDocuments({})
  },
  Author: {bookCount: (root)=>{return(Book.countDocuments({author:root}))}},
 Mutation:{
    addBook: async (root,args) =>{
      console.log(args.name)
      let author= await Author.findOne({'name':args.author})
      console.log("author",author)
      if(!author){
        try{author = new Author({name:args.author})
        console.log("author2",author)
        await author.save()}catch(error){
          throw new UserInputError(error.message,{invalidArgs:args})
        }
      }
      try {
        const book = new Book({...args,author:author._id})
      console.log('book',{...book._doc,author})
      await book.save()
      return {...book._doc,author}
      } catch (error) {
        throw new UserInputError(error.message,{invalidArgs:args})
      }
    },
    editAuthor: async(root,args)=>{
      console.log(args)
      const author = Author.findOneAndUpdate({name:args.name},{born:args.setBornTo},{ new: true })
      return author
    }
  }
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})