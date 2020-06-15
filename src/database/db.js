const sqlite3 = require('sqlite3').verbose()

// Cruar o objeto quer irá fazer operações no banco de dados
const db = new sqlite3.Database('./src/database/database.db')

// Utilizar o objeto de banco de dados, para nossa operções
db.serialize(() => {
    // Criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // Inserir dados na tabela
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
        "https://images.unsplash.com/photo-1580706483913-b6ea7db483a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1237&q=80",
        "Colectoria",
        "Guilherme Gemballa, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterIsertData(err) {
        if (err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    // db.run(query, values, afterIsertData)

    // Consultar os dados da tabela

    // Deletar um dado da tabela
})