const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')

const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')

mongoose.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>logger.info('connected to database'))
.catch(err=>logger.error('error: ',err.message))
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)
app.use('/api/blogs',blogRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)
if (process.env.NODE_ENV === 'test') {  
    const testingRouter = require('./controllers/testing')  
    app.use('/api/testing', testingRouter)}


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports=app
