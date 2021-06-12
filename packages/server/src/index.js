const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 7000

app.use(morgan('combined'))

app.get('/api/users', (req, res) => {
    res.send({
        "count": 1000000
    })
})

app.get('/api/users2', (req, res) => {
    res.send({
        "count": 2000000
    })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})