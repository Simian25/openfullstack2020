require('dotenv').config()

const url = process.env.MONGO_URL
const port = process.env.PORT

module.exports={
    url,port
}