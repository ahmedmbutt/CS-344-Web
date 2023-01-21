const express = require("express")
const axios = require("axios")
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000
const app = express()

app.set("json spaces", 2)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Welcome to our App!")
})

app.get("/getData", (req, res) => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
        .then(function (response) {
            res.json(response.data)
        }).catch(function (error) {
            res.json('Error occured!')
        })
})

app.post("/getUserById", (req, res) => {
    if (!req.body.id) {
        res.json("No ID found in request body.")
    } else {
        axios.get(`https://jsonplaceholder.typicode.com/users/${req.body.id}`)
            .then(function (response) {
                res.send(response.data)
            }).catch(function (error) {
                res.send("Error occured!")
            })
    }
})

app.listen(PORT, function () {
    console.log(`Express server listening on ${PORT}`)
})
