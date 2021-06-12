const express = require('express')
const morgan = require('morgan')
const cookieParser = require("cookie-parser")

const app = express()
const port = 7000

app.use(morgan('combined'))
app.use(cookieParser())

app.get('/api/users', (req, res) => {
    console.log(req.cookies['token'])
    res.send({
        "count": 1000000
    })
})

app.get('/api/users2', (req, res) => {
    console.log(req.cookies['token'])
    res.send({
        "count": 2000000
    })
})

app.get('/api/login', (req, res) => {
    const options = {
        maxAge: 1000 * 60 * 15,
        httpOnly: true, 
        sameSite: 'Strict'
    }
    res.cookie('token','secret', options);
    res.send({
        "status": "logged in"
    })
})

app.get('/api/logout', (req, res) => {
    res.clearCookie("token");
    res.send({
        "status": "logged in"
    })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})