const express = require('express')
const bodyParser = require('body-parser')
const MCQs = require('./utils/mcqs.json')

let correct = 0
const pages = 4, ques = 5
const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render("start.ejs", { pages: pages, ques: ques })
})

app.post(/^\/page-\d$/, function (req, res) {
    const no = parseInt(req.url.slice(-1))
    if (no >= 1 && no <= pages + 1) {
        MCQs.questions.forEach((mcq, i) => {
            if (mcq['correct-answer'] == req.body[i]) {
                ++correct
            }
        })
        if (no == pages + 1) {
            res.redirect('/result')
        } else {
            res.render('quiz.ejs', { pages: pages, ques: ques, curr: no, MCQs: MCQs.questions.slice(no * ques - ques, no * ques) })
        }
    } else {
        res.sendStatus(404)
    }
})

app.get('/result', function (req, res) {
    res.render('finish.ejs', { correct: correct, wrong: MCQs.questions.length - correct })
})

const server = app.listen(process.env.port || 5000, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Quiz App listening at http://%s:%s", server.address().address, server.address().port);
    }
})
