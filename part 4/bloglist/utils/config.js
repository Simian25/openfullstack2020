require('dotenv').config()

let url = process.env.MONGO_URL
const port = process.env.PORT
if (process.env.NODE_ENV === 'test') {  url = process.env.MONGO_TEST_URL}
module.exports={
    url,port
}