const express = require('express')
const server = express()

const db = require('./database/db')

server.use(express.static('public'))

server.use(express.urlencoded({ extended: true }))

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})


server.get('/', (req, res) => {
    return res.render('index.html', {title: 'Seu marketplace de coleta de resíduos'})
})

server.get('/create-point', (req, res) => {
    return res.render('create-point.html')
})

server.post("/savepoint", (req, res) => {
    console.log(req.body)
    const query = `
        INSERT INTO places (
            image,
            name,
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items       
    ]

    function afterIsertData(err) {
        if (err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.send("ok")
    }

    db.run(query, values, afterIsertData)
})

server.get('/search', (req, res) => {
    // Pegar os dados do banco de dados
    db.all(`SELECT * FROM places`, function(err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        return res.render('search-results.html', { places: rows, total })
    })

})




server.listen(3000)