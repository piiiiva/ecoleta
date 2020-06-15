const express = require('express')
const server = express()

const db = require('./database/db')

server.use(express.static('public'))

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