const express = require('express')
const morgan = require('morgan');

const port = process.env.PORT || 4000

//load env variables
dotenv.config({ path: './config/config.env' });

const app = express()

// middleware

// body parser
app.use(express.json());


// logger
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Collection Management app listening at http://localhost:${port}`)
})