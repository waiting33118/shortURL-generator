const express = require('express')
const exphdbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
require('./config/mongoose')
const PORT = process.env.PORT || 3000

app.engine('handlebars', exphdbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => console.log(`The Server is running on port ${PORT}`))
