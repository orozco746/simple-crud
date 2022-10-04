import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()

const app = express();
app.use(express.json())
app.use(cors())

const client = new mysql.createConnection({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
})

client.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
})


app.get('/books', (req, res) => {
    const q = "SELECT * FROM books;"
    client.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data)
    })
})
app.post('/books', (req, res) => {
    const query = "INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES (?);"
    const values = [
        req.body.title, 
        req.body.desc,
        req.body.cover,
        req.body.price
    ];
    client.query(query, [values] ,(err, data) => {
        if (err) return res.json(err);
        return res.json(data)
    })
})


app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `cover`= ?, `price`= ? WHERE id = ?";
    const values = [
        req.body.title, 
        req.body.desc,
        req.body.cover,
        req.body.price
    ];
    client.query(q, [...values,bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      });
    });

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const query = "DELETE FROM books WHERE id = ? ;"
    client.query(query, [bookId] ,(err, data) => {
        if (err) return res.json(err);
        return res.json('book deleted')
    })
})


app.listen(8800, () => { console.log('App running on port 8800') })