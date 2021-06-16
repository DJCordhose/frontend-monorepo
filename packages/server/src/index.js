const express = require('express')
const morgan = require('morgan')
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');

const jwtAuthEnabled = process.env.USE_JWT_AUTH === "true";
const jwtSecret = process.env.TOKEN_SECRET;

const app = express()
const port = 7000

app.use(morgan('combined'))
app.use(cookieParser())
app.use(bodyParser.json())


app.use((req, res, next) => {
  if (jwtAuthEnabled) {
    const token = req.headers.authorization;
    if (token) {
      const payload = jwt.verify(token, jwtSecret);
      req.user = payload;
    }
  }
    next();
  });

app.get('/api/users', (req, res) => {
    console.log(req.cookies['token'])
    console.log(req.user)
    res.send({
        "count": 1000000
    })
})

app.get('/api/users2', (req, res) => {
    console.log(req.cookies['token'])
    console.log(req.user)
    res.send({
        "count": 2000000
    })
})

app.post('/api/login', (req, res) => {
    if (jwtAuthEnabled) {
        const login = req.body;
        console.log(`login: ${JSON.stringify(login)}`)

        if (!login) {
          return res.status(400).json({ error: "login (payload) must be defined" });
        }
    
        if (!login.login) {
          return res.status(400).json({ error: "login.login must be defined" });
        }
    
        if (!login.password) {
          return res.status(400).json({ error: "login.password must be defined" });
        }
    
        const token = jwt.sign({login: login.login, rules: ['yo']}, jwtSecret, {
            expiresIn: '15 min'
        });

        return res.status(200).json({
          token
        });
    
    } else {
        const options = {
            maxAge: 1000 * 60 * 15,
            httpOnly: true, 
            sameSite: 'Strict'
        }
        res.cookie('token','secret', options);
        res.status(200).json({
            "status": "logged in"
        })
    }
})

app.get('/api/logout', (req, res) => {
    res.clearCookie("token");
    res.send({
        "status": "logged in"
    })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
  if (jwtAuthEnabled) {
    console.log(`JWT auth enabled`)
  } else {
    console.log(`cookie auth enabled`)
  }
})