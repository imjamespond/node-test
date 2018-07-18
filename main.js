const express = require('express');
const Promise = require('bluebird');
const sqlite = require('sqlite');

const app = express();
const port = process.env.PORT || 3000;
// const dbPromise = sqlite.open('./database.sqlite', { Promise });

// let p = sqlite.open(':memory:', { cached: true });
let p = sqlite.open('./database.sqlite', { cached: true });
p = p.then(() => sqlite.exec('CREATE TABLE IF NOT EXISTS tbl (col TEXT)'));
p = p.then(() => sqlite.exec('INSERT INTO tbl VALUES ("test")'));
p = p.then(() => sqlite.get('SELECT col FROM tbl').then((result) => {
    console.log(result)
}));
p = p.then(() => sqlite.all('SELECT col FROM tbl').then((result) => {
    console.log(result)
}));
p = p.then(() => sqlite.all('SELECT * FROM tbl WHERE col = ?', 'test').then((result) => {
    console.log(result)
}));

// app.get('/post/:id', async (req, res, next) => {
//     try {
//         const db = await dbPromise;
//         const [post, categories] = await Promise.all([
//             db.get('SELECT * FROM Post WHERE id = ?', req.params.id),
//             db.all('SELECT * FROM Category')
//         ]);
//         res.render('post', { post, categories });
//     } catch (err) {
//         next(err);
//     }
// });

// app.listen(port);