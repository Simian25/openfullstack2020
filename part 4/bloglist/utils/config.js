require('dotenv').config()

const url = process.env.MONGO_URL
const port = process.env.PORT
if (process.env.NODE_ENV === 'test') {  MONGODB_URL = process.env.MONGODB_TEST_URL}
module.exports={
    url,port
}