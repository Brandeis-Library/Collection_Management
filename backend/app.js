const express = require('express')
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors')

const port = process.env.PORT || 4000

//load env variables
dotenv.config({ path: './config/config.env' });

const inventoryRouter = require('./routes/inventory')

const app = express()

// middleware

// body parser
app.use(express.json());


// logger
app.use(morgan('dev'))

// cors
app.use(cors())

app.get('/', (req, res) => {
  res.send('Welcome to the Collection Mangement application backend!')
})

//create routes
app.use('/api/v1/inventory', inventoryRouter);

app.listen(port, () => {
  console.log(`Collection Management app listening at http://localhost:${port}`)
})