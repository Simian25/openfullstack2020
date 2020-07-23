const { ApolloServer,UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book  = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')


require('dotenv').config()

let url = process.env.MONGO_URL
const JWT_SECRET = process.env.KEY
console.log(JWT_SECRET)



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
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}
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
    me: User
    allBooks(author: String,genre: String): [Book!]!
    allAuthors: [Author!]!
    bookCount: Int!
    authorCount: Int!
  }
  type Mutation{
    addBook(title: String!,author: String!, published: Int!,genres:[String!]!): Book!
    editAuthor(name: String!,setBornTo: Int!): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`
const { v1: uuid } = require('uuid')

const resolvers = {
  Query: {
    allBooks: ()=>Book.find({}).populate('author',{name:1}),
    allAuthors:()=>Author.find({}),
    bookCount:  ()=>Book.countDocuments({}),
    authorCount: ()=>Author.countDocuments({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {bookCount: (root)=>{return(Book.countDocuments({author:root}))}},
 Mutation:{
    addBook: async (root,args,context) =>{
      const currentUser = context.currentUser

    if (!currentUser) {
      throw new AuthenticationError("not authenticated")
    }
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
    editAuthor: async(root,args,context)=>{
      const currentUser = context.currentUser

    if (!currentUser) {
      throw new AuthenticationError("not authenticated")
    }
      console.log(args)
      const author = Author.findOneAndUpdate({name:args.name},{born:args.setBornTo},{ new: true })
      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username,favoriteGenre:args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== process.env.PASSWORD ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {    const auth = req ? req.headers.authorization : null    
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id)   
  return { currentUser }    }  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})