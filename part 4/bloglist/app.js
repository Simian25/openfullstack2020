const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')




mongoose.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>logger.info('connected to database'))
.catch(err=>logger.error('error: ',err.message))
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.use(cors())

app.use(express.json())
app.use('/api/blogs',blogRouter)
app.use('/api/users',userRouter)

module.exports=app
