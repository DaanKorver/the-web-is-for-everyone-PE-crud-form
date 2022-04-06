const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

const PORT = process.env.PORT || 42069
const server = app.listen(PORT, () => {
  console.log(`App listening on http://[${server.address().address}]:${server.address().port}`)
})

const indexRoute = require('./routes/index')

app.use('/', indexRoute)